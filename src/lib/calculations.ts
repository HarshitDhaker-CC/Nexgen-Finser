// Complete financial calculation engine for Wealth Projection Studio
// Phase 1: Wealth Creation  (Lumpsum + SIP with step-up)
// Phase 2: Wealth Preservation (pure compounding, no SIP/withdrawal)
// Phase 3: Wealth Distribution (SWP with step-up, separate return rate)

export interface WealthStudioInputs {
  // Phase 1 - Accumulation
  lumpsumAmount: number;        // Initial lumpsum (₹)
  sipAmount: number;             // Monthly SIP amount (₹)
  sipStepUpPercent: number;     // Annual step-up % for SIP
  annualReturnPercent: number;  // Expected annual return during accumulation
  totalDurationYears: number;   // Total projection duration (years)
  sipStopYear: number;           // Year when SIP stops (inclusive - SIP runs in this year)
  withdrawalStartYear: number;  // Year when withdrawals start (inclusive)

  // Phase 3 - Distribution
  withdrawalReturnPercent: number; // Return rate during withdrawal phase
  monthlySwpAmount: number;        // Initial monthly SWP (₹)
  swpStepUpPercent: number;        // Annual step-up % for SWP
}

export interface YearlyData {
  year: number;
  phase: 1 | 2 | 3;
  sipAmount: number;       // SIP amount in that year (0 in phase 2/3)
  totalInvested: number;   // Cumulative investment (lumpsum + all SIPs so far)
  withdrawn: number;       // Cumulative SWP withdrawn so far
  returns: number;         // corpus - totalInvested + withdrawn (net gain realised)
  corpus: number;          // Corpus at end of year
}

export interface WealthProjectionResult {
  yearlyData: YearlyData[];
  totalInvestment: number;    // Lumpsum + all SIP contributions
  corpusAtSipStop: number;    // Corpus at end of sipStopYear
  totalSwpWithdrawn: number;  // Total SWP withdrawn across Phase 3
  finalCorpus: number;        // Corpus at end of totalDurationYears
  totalReturns: number;       // finalCorpus + totalSwpWithdrawn - totalInvestment
  wealthMultiplier: number;   // (finalCorpus + totalSwpWithdrawn) / totalInvestment
}

// ---------------------------------------------------------------------------
// Helper: safe monthly compounding rate from an annual percentage
// ---------------------------------------------------------------------------
function monthlyRate(annualPercent: number): number {
  return Math.pow(1 + annualPercent / 100, 1 / 12) - 1;
}

// ---------------------------------------------------------------------------
// Main calculation function
// ---------------------------------------------------------------------------
export function calculateWealthProjection(
  inputs: WealthStudioInputs
): WealthProjectionResult {
  const {
    lumpsumAmount,
    sipAmount,
    sipStepUpPercent,
    annualReturnPercent,
    totalDurationYears,
    sipStopYear,
    withdrawalStartYear,
    withdrawalReturnPercent,
    monthlySwpAmount,
    swpStepUpPercent,
  } = inputs;

  // -------------------------------------------------------------------------
  // Validate / clamp inputs to sane values
  // -------------------------------------------------------------------------
  const clampedSipStopYear = Math.max(
    1,
    Math.min(sipStopYear, totalDurationYears)
  );
  // withdrawalStartYear must be > sipStopYear and <= totalDurationYears
  // If they overlap we push withdrawal start to sipStopYear + 1
  const clampedWithdrawalStartYear = Math.max(
    clampedSipStopYear + 1,
    Math.min(withdrawalStartYear, totalDurationYears + 1) // +1 allows "no withdrawal phase"
  );

  const accumMonthlyRate = monthlyRate(annualReturnPercent);
  const withdrawalMonthlyRate = monthlyRate(withdrawalReturnPercent);

  // -------------------------------------------------------------------------
  // State variables
  // -------------------------------------------------------------------------
  let corpus = lumpsumAmount;           // starts with lumpsum
  let totalInvested = lumpsumAmount;    // track cumulative investment
  let totalWithdrawn = 0;               // track cumulative SWP
  let corpusAtSipStop = 0;

  // SIP for the current year (resets / steps-up at start of each year)
  let sipThisYear = sipAmount;
  // SWP for the current year
  let swpThisYear = monthlySwpAmount;

  const yearlyData: YearlyData[] = [];

  // -------------------------------------------------------------------------
  // Utility: determine phase for a given year number
  // -------------------------------------------------------------------------
  function phaseForYear(year: number): 1 | 2 | 3 {
    if (year <= clampedSipStopYear) return 1;
    if (year < clampedWithdrawalStartYear) return 2;
    return 3;
  }

  // =========================================================================
  // Main loop – iterate year by year, month by month
  // =========================================================================
  for (let year = 1; year <= totalDurationYears; year++) {
    const phase = phaseForYear(year);
    const sipInThisYear = phase === 1 ? sipThisYear : 0;

    // Apply annual step-up at the START of each year (year 1 uses base rate,
    // step-up kicks in from year 2 onward for SIP; same logic for SWP).
    if (year > 1) {
      if (phase === 1) {
        // SIP step-up (only relevant while still in accumulation)
        sipThisYear =
          sipThisYear * (1 + sipStepUpPercent / 100);
      }
      if (phase === 3) {
        // SWP step-up at the start of each new withdrawal year
        swpThisYear =
          swpThisYear * (1 + swpStepUpPercent / 100);
      }
    }

    // Track how much SIP was active in this year (snapshot before monthly loop)
    const sipAmountForRecord = phase === 1 ? sipThisYear : 0;

    // ---------------------------------------------------------------------
    // Monthly simulation for this year
    // ---------------------------------------------------------------------
    let corpusWentNegative = false;

    for (let month = 1; month <= 12; month++) {
      if (phase === 1) {
        // SIP deposited at BEGINNING of month, then compound
        corpus = (corpus + sipThisYear) * (1 + accumMonthlyRate);
        totalInvested += sipThisYear;
      } else if (phase === 2) {
        // Pure compounding – accumulation rate, no SIP, no withdrawal
        corpus = corpus * (1 + accumMonthlyRate);
      } else {
        // Phase 3: compound then withdraw
        corpus = corpus * (1 + withdrawalMonthlyRate) - swpThisYear;

        if (corpus <= 0) {
          // Corpus exhausted – record the last actual withdrawal and stop
          totalWithdrawn += Math.max(
            0,
            corpus + swpThisYear // amount actually available before corpus hit 0
          );
          corpus = 0;
          corpusWentNegative = true;
          break; // stop monthly loop for this year
        }

        totalWithdrawn += swpThisYear;
      }
    }

    // If corpus went negative mid-year, remaining months contribute nothing
    // (already handled by break above)

    // Record corpus at end of sipStopYear (before phase 2 begins)
    if (year === clampedSipStopYear) {
      corpusAtSipStop = corpus;
    }

    // Snapshot for yearlyData
    const cumulativeReturns = corpus - totalInvested + totalWithdrawn;

    yearlyData.push({
      year,
      phase,
      sipAmount: sipAmountForRecord,
      totalInvested: Math.round(totalInvested * 100) / 100,
      withdrawn: Math.round(totalWithdrawn * 100) / 100,
      returns: Math.round(cumulativeReturns * 100) / 100,
      corpus: Math.round(corpus * 100) / 100,
    });

    // If corpus is 0 and we're in phase 3, no point simulating further years
    if (corpusWentNegative || (phase === 3 && corpus <= 0)) {
      // Fill remaining years with zeroed-out records so charts don't break
      for (let remainingYear = year + 1; remainingYear <= totalDurationYears; remainingYear++) {
        yearlyData.push({
          year: remainingYear,
          phase: 3,
          sipAmount: 0,
          totalInvested: Math.round(totalInvested * 100) / 100,
          withdrawn: Math.round(totalWithdrawn * 100) / 100,
          returns: Math.round((totalWithdrawn - totalInvested) * 100) / 100,
          corpus: 0,
        });
      }
      break;
    }

    // Prepare sipThisYear for next year if still in phase 1 at year boundary
    // (step-up is applied at START of year, handled at top of next iteration)
  }

  // =========================================================================
  // Derive summary metrics
  // =========================================================================
  const finalCorpus =
    yearlyData.length > 0
      ? yearlyData[yearlyData.length - 1].corpus
      : 0;

  const totalReturns = finalCorpus + totalWithdrawn - totalInvested;

  // Guard against division by zero
  const wealthMultiplier =
    totalInvested > 0
      ? (finalCorpus + totalWithdrawn) / totalInvested
      : 0;

  return {
    yearlyData,
    totalInvestment: Math.round(totalInvested * 100) / 100,
    corpusAtSipStop: Math.round(corpusAtSipStop * 100) / 100,
    totalSwpWithdrawn: Math.round(totalWithdrawn * 100) / 100,
    finalCorpus: Math.round(finalCorpus * 100) / 100,
    totalReturns: Math.round(totalReturns * 100) / 100,
    wealthMultiplier: Math.round(wealthMultiplier * 10000) / 10000,
  };
}

// ---------------------------------------------------------------------------
// Utility helpers (re-exported for UI convenience)
// ---------------------------------------------------------------------------

/** Format a rupee amount with Indian-style lakhs/crores shorthand */
export function formatIndianCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_00_00_000) {
    return `${sign}₹${(abs / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (abs >= 1_00_000) {
    return `${sign}₹${(abs / 1_00_000).toFixed(2)} L`;
  }
  if (abs >= 1_000) {
    return `${sign}₹${(abs / 1_000).toFixed(1)} K`;
  }
  return `${sign}₹${abs.toFixed(0)}`;
}

/** Format a number as a plain Indian-locale currency string (for tables) */
export function formatRupee(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Return % change as a signed string, e.g. "+12.5%" */
export function formatPercent(value: number, decimals = 1): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/** Determine the color class for a metric value (positive / negative / neutral) */
export function metricColorClass(
  value: number,
  options: { inverse?: boolean } = {}
): string {
  const positive = options.inverse ? value < 0 : value > 0;
  const negative = options.inverse ? value > 0 : value < 0;
  if (positive) return "text-emerald-400";
  if (negative) return "text-red-400";
  return "text-slate-400";
}

"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Nexgen%20Finser%2C%20I%20would%20like%20a%20free%20consultation%20for%20financial%20planning."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-float"
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}

import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Swedel Dsouza for opportunities and projects.",
};

export default function ContactPage() {
  return <ContactContent />;
}

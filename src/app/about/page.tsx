import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full Stack Developer with a CGPA of 9.13 and 9th State Rank under VTU — building scalable web applications.",
};

export default function AboutPage() {
  return <AboutContent />;
}

import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of full stack, mobile and frontend projects built by Swedel Dsouza.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}

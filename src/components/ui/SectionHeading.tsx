import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`mb-14 ${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {kicker && (
        <span
          className={`mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-accent/50" />
          {kicker}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body text-base leading-relaxed text-fg-muted">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

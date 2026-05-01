import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-5 py-10 sm:px-6 sm:py-14 md:py-20 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="mb-4 h-1 w-10 rounded-full bg-amber" />
      <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export function SectionSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 sm:mb-12 max-w-[55ch] text-text-muted text-base md:text-lg leading-relaxed">
      {children}
    </p>
  );
}

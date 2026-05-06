import "./Section.css";

interface SectionProps {
  id?: string;
  className?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}

export default function Section({ id, className, fullBleed = false, children }: SectionProps) {
  return (
    <section id={id} className={`section${className ? ` ${className}` : ""}`}>
      {fullBleed ? children : <div className="container">{children}</div>}
    </section>
  );
}

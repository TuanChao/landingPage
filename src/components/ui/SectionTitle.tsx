interface SectionTitleProps {
  children: string;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h2>{children}</h2>;
}

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <div className="editorial-eyebrow mb-3">{eyebrow}</div>}
      <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

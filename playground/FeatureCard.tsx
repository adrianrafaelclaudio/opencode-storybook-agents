export interface FeatureCardProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function FeatureCard({
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-visual" aria-hidden="true">
        <div className="feature-mark">Aa</div>
      </div>
      <div className="feature-copy">
        <span className="feature-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="feature-actions">
          <button className="primary" type="button" onClick={onPrimary}>
            {primaryLabel}
          </button>
          <button className="secondary" type="button" onClick={onSecondary}>
            {secondaryLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

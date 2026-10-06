export interface FlowStep {
  label: string;
  detail?: string;
}

/**
 * Vertical system flow diagram.
 *
 * Rendered as an ordered list so the sequence survives without CSS and is
 * announced correctly. Purely presentational — it never carries information
 * that isn't also written in the surrounding prose.
 */
export default function Flow({
  steps,
  detail = true,
  label,
}: {
  steps: FlowStep[];
  detail?: boolean;
  label: string;
}) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((step, i) => (
        <li key={step.label} className="flow-step">
          <span className="flow-index" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex flex-col gap-1">
            <span className="flow-label">{step.label}</span>
            {detail && step.detail && (
              <span className="text-[13px] leading-relaxed text-muted">{step.detail}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
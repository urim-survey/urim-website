type Step = { title: string; desc: string };

export default function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {steps.map((step, i) => (
        <li key={step.title} className="border-t-2 border-ink pt-6">
          <div className="text-3xl font-bold text-ink">{String(i + 1).padStart(2, "0")}</div>
          <div className="mt-3 font-semibold text-ink">{step.title}</div>
          <div className="mt-2 text-sm text-secondary">{step.desc}</div>
        </li>
      ))}
    </ol>
  );
}

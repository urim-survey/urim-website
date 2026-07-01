type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-6">
          <summary className="flex items-center justify-between cursor-pointer text-ink font-medium list-none">
            {f.q}
            <span className="text-secondary group-open:rotate-45 transition-transform">+</span>
          </summary>
          <div className="mt-3 text-sm text-secondary">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "상담은 유료인가요?",
    a: "아니요, 초기 상담과 토지 기본 검토는 완전 무료입니다. 지번만 알려주시면 개발 가능 여부를 먼저 검토해 드립니다. 검토 후 진행 여부를 결정하셔도 됩니다.",
  },
  {
    q: "지번만 알아도 상담이 가능한가요?",
    a: "네, 지번만 있으면 개발 가능 여부를 기본적으로 검토해 드립니다. 등기부등본이나 토지이용계획확인서 등 별도 서류 없이도 기본 검토가 가능합니다. 전화나 온라인으로 지번을 알려주시면 됩니다.",
  },
  {
    q: "허가가 반드시 나는 건가요?",
    a: "토지 조건과 용도지역에 따라 허가 가능 여부가 달라집니다. 사전 검토를 통해 허가 가능성을 먼저 확인해 드리며, 허가가 어려운 경우에는 그 이유와 대안을 솔직하게 안내해 드립니다. 가능성이 낮은 건에 대해 무리하게 진행하지 않는 것이 저희 원칙입니다.",
  },
  {
    q: "횡성 외 지역도 가능한가요?",
    a: "강원도 내 다른 지역도 상담 및 업무 처리가 가능합니다. 원주, 홍천, 평창, 영월 등 강원도 전 지역을 커버하고 있습니다. 멀리 떨어진 지역의 경우 현장 방문 일정을 조율하여 진행합니다.",
  },
  {
    q: "서류 준비를 직접 해야 하나요?",
    a: "대부분의 서류는 저희가 대행합니다. 고객께서는 신분증과 도장 정도만 준비하시면 됩니다. 위임장 작성 후 토지이용계획확인서, 지적도, 등기사항전부증명서 등 필요한 행정 서류를 저희가 직접 발급하고 취합하여 처리합니다.",
  },
  {
    q: "태양광 부지를 못 구했는데 상담 가능한가요?",
    a: "네, 부지를 아직 구하지 못한 상태에서도 상담이 가능합니다. 어떤 조건의 토지를 찾아야 하는지, 허가 가능성이 높은 부지 조건은 무엇인지 함께 검토해 드립니다. 부지 선정 단계부터 도움을 드릴 수 있습니다.",
  },
  {
    q: "허가 비용은 얼마나 드나요?",
    a: "허가 종류, 토지 면적, 사업 규모에 따라 비용이 다릅니다. 상담 후 견적을 별도로 안내해 드립니다. 관공서 납부 수수료, 농지보전부담금 등 법적 비용과 대행 수수료를 포함하여 투명하게 안내해 드립니다.",
  },
  {
    q: "허가까지 기간이 얼마나 걸리나요?",
    a: "허가 종류에 따라 다릅니다. 개발행위허가는 3~8주, 농지전용허가는 4~8주, 태양광 인허가는 6~12주 정도 소요됩니다. 단, 토지 조건이나 보완 서류 발생 시 더 늘어날 수 있습니다. 정확한 기간은 사전 검토 후 안내해 드립니다.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900 flex items-start gap-3">
          <span className="text-[#0057b8] font-bold flex-shrink-0">Q.</span>
          {q}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 py-5 bg-blue-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed flex gap-3">
            <span className="text-[#003087] font-bold flex-shrink-0">A.</span>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-blue-200 text-lg">
            궁금하신 점을 확인해 보세요
          </p>
        </div>
      </section>

      {/* FAQ 목록 */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 더 궁금한 점 */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#003087] mb-4">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-gray-600 mb-8">
            전화 또는 온라인 문의를 통해 직접 상담해 드립니다.
            <br />
            어떤 사소한 질문도 성심껏 답변드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-[#003087] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#0057b8] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
              </svg>
              033-345-1253 전화 상담
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#003087] text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-[#003087] hover:text-white transition-colors"
            >
              온라인 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

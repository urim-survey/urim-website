import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "업무절차 | 우림측량",
  description:
    "우림측량의 업무 처리 절차를 안내합니다. 무료 상담부터 허가 완료까지 5단계로 진행됩니다.",
};

const steps = [
  {
    step: "STEP 1",
    title: "무료 상담",
    icon: "💬",
    color: "bg-blue-50 border-blue-200",
    accent: "bg-[#003087]",
    desc: "전화 또는 온라인 문의를 통해 상담을 시작합니다.",
    details: [
      "토지 지번만 알려주시면 기본 검토 무료 진행",
      "개발 가능 여부 및 필요 허가 종류 안내",
      "예상 소요 기간 및 비용 안내",
      "추가 현장 조사 필요 여부 판단",
    ],
    tip: "지번 또는 주소만 있으면 됩니다. 등기부등본 등 서류가 없어도 기본 검토가 가능합니다.",
  },
  {
    step: "STEP 2",
    title: "현장 조사",
    icon: "🔍",
    color: "bg-green-50 border-green-200",
    accent: "bg-green-700",
    desc: "담당자가 직접 현장을 방문하여 정밀 조사를 진행합니다.",
    details: [
      "지형·경사도·토질 현황 파악",
      "도로 접도 조건 및 진출입 가능 여부 확인",
      "인접 토지 및 주변 환경 조사",
      "허가 조건에 영향을 미치는 현황 파악",
    ],
    tip: "현장 조사 결과에 따라 허가 가능 여부와 조건이 최종 결정됩니다.",
  },
  {
    step: "STEP 3",
    title: "서류 준비",
    icon: "📄",
    color: "bg-yellow-50 border-yellow-200",
    accent: "bg-yellow-600",
    desc: "허가 종류에 맞는 서류를 준비합니다. 대부분의 서류는 저희가 대행합니다.",
    details: [
      "허가에 필요한 서류 목록 전달",
      "고객이 직접 준비해야 하는 서류 안내",
      "토지이용계획확인서, 지적도 등 행정 서류 대행 발급",
      "설계도면 및 위치도 작성 (필요 시)",
    ],
    tip: "신분증과 도장만 있으면 대부분의 서류 준비가 가능합니다. 위임장 작성 후 저희가 모두 처리합니다.",
  },
  {
    step: "STEP 4",
    title: "허가 신청",
    icon: "📮",
    color: "bg-purple-50 border-purple-200",
    accent: "bg-purple-700",
    desc: "관할 지자체에 허가를 신청하고 담당 공무원과 협의합니다.",
    details: [
      "관할 군청·시청 허가 부서 접수",
      "담당 공무원 현장 조사 동행 (필요 시)",
      "보완 요청 사항 즉시 처리",
      "허가 조건 협의 및 이행 방안 수립",
    ],
    tip: "접수 후 법정 처리기간이 있습니다. 보완 사항 발생 시 즉시 처리하여 기간을 단축합니다.",
  },
  {
    step: "STEP 5",
    title: "허가 완료",
    icon: "✅",
    color: "bg-red-50 border-red-200",
    accent: "bg-red-600",
    desc: "허가증을 전달하고 이후 절차를 안내해 드립니다.",
    details: [
      "허가증 수령 및 고객 전달",
      "허가 조건 내용 설명 및 이행 안내",
      "착공신고 등 후속 절차 안내",
      "준공검사 일정 안내 (필요 시)",
    ],
    tip: "허가증 수령 후에도 착공 신고 등 후속 절차가 있습니다. 필요 시 지속 지원해 드립니다.",
  },
];

const periods = [
  { type: "개발행위허가", period: "3~8주", note: "토지 조건에 따라 상이" },
  { type: "농지전용허가", period: "4~8주", note: "농지 규모에 따라 상이" },
  {
    type: "태양광 인허가",
    period: "6~12주",
    note: "발전용량 및 부지 조건에 따라 상이",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">업무 절차</h1>
          <p className="text-blue-200 text-lg">
            처음부터 끝까지 5단계로 진행합니다
          </p>
        </div>
      </section>

      {/* 소요 기간 요약 */}
      <section className="bg-[#0057b8] text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {periods.map((item) => (
              <div key={item.type} className="text-center py-2">
                <div className="font-bold text-lg">{item.type}</div>
                <div className="text-2xl font-bold text-yellow-300 my-1">
                  {item.period}
                </div>
                <div className="text-blue-200 text-xs">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 단계별 절차 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* 연결선 (PC) */}
            <div className="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-gray-200 z-0" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.step} className="relative flex gap-6 md:gap-8">
                  {/* 스텝 번호 (좌측 타임라인) */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#003087] text-white flex flex-col items-center justify-center shadow-md">
                      <span className="text-xs font-medium leading-none">
                        STEP
                      </span>
                      <span className="text-lg font-bold leading-none">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex-1 pb-2">
                    <div
                      className={`border rounded-xl p-6 ${step.color} mb-0`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <div className="text-xs text-gray-500 font-medium">
                            {step.step}
                          </div>
                          <h2 className="text-xl font-bold text-[#003087]">
                            {step.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{step.desc}</p>
                      <ul className="space-y-1.5 mb-4">
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-[#0057b8] mt-0.5">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white rounded-lg px-4 py-3 border border-blue-100">
                        <span className="text-xs font-bold text-[#0057b8] mr-2">
                          Tip
                        </span>
                        <span className="text-sm text-gray-600">
                          {step.tip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">지금 바로 첫 단계를 시작하세요</h2>
          <p className="text-blue-200 mb-8">
            무료 상담은 전화 또는 온라인으로 가능합니다.
            <br />
            지번만 알려주시면 바로 검토해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              033-345-1253 전화 상담
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#003087] transition-colors"
            >
              온라인 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

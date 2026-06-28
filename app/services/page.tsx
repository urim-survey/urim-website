import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스안내 | 우림측량",
  description:
    "개발행위허가, 농지전용허가, 태양광발전 인허가 등 토지 관련 모든 인허가 서비스를 제공합니다.",
};

const services = [
  {
    id: "development",
    icon: "🏗️",
    title: "개발행위허가",
    subtitle: "건축·공작물 설치·토지형질변경 전 반드시 필요한 허가",
    period: "소요기간: 3~8주",
    description:
      "개발행위허가는 건축물 설치, 공작물 설치, 토지형질변경, 토석채취, 토지분할 등의 행위를 할 경우 반드시 받아야 하는 허가입니다. 도시계획법령상의 규정과 도시계획시설의 설치에 지장을 주지 않는 범위 내에서 허가가 이루어집니다.",
    details: [
      "건축물의 건축 또는 공작물의 설치",
      "토지의 형질 변경 (절토, 성토, 정지, 포장 등)",
      "토석의 채취",
      "토지 분할",
      "물건 적치",
    ],
    process: [
      "부지 현황 조사 및 용도지역 확인",
      "개발행위허가 가능 여부 사전 검토",
      "필요 서류 목록 안내 및 대행",
      "관할 지자체 허가 신청",
      "담당 공무원 협의 및 조건 이행",
      "허가증 수령 및 인계",
    ],
  },
  {
    id: "farmland",
    icon: "🌾",
    title: "농지전용허가",
    subtitle: "농지를 다른 목적으로 사용하고 싶을 때 필요한 허가",
    period: "소요기간: 4~8주",
    description:
      "농지전용허가는 농지를 농업 이외의 용도로 사용하고자 할 때 반드시 받아야 하는 허가입니다. 주택 건축, 창고 설치, 공장 신설 등 다양한 목적으로 농지를 전용할 때 농지법에 따라 허가 또는 신고 절차를 거쳐야 합니다.",
    details: [
      "주택 건축을 위한 농지 전용",
      "창고·공장 등 시설 설치를 위한 전용",
      "도로·수로 등 공공시설 부지 전용",
      "농업 생산기반 시설 설치를 위한 전용",
      "기타 비농업적 용도로의 전환",
    ],
    process: [
      "농지 현황 조사 및 전용 가능 여부 검토",
      "농지전용 허가 또는 신고 유형 결정",
      "농업손실보상 비용 산정",
      "필요 서류 준비 및 대행",
      "농지 전용 허가 신청",
      "허가 후 이행 관리",
    ],
  },
  {
    id: "solar",
    icon: "☀️",
    title: "태양광발전 인허가",
    subtitle: "부지 선정부터 발전사업 허가까지 원스톱 처리",
    period: "소요기간: 6~12주",
    description:
      "태양광발전 사업은 발전사업 허가, 개발행위허가, 농지전용허가, 환경영향평가 등 여러 단계의 복잡한 인허가 절차가 필요합니다. 우림측량은 부지 선정 단계부터 모든 인허가를 원스톱으로 처리하여 사업 기간을 단축시켜 드립니다.",
    details: [
      "태양광 발전사업 허가 (전기사업법)",
      "개발행위허가 (국토계획법)",
      "농지전용허가 (농지법)",
      "공유수면 점용 허가 (필요 시)",
      "소규모 환경영향평가 (해당 시)",
    ],
    process: [
      "부지 조건 분석 및 수익성 사전 검토",
      "인허가 가능 여부 종합 검토",
      "발전사업 허가 신청 (전력거래소)",
      "개발행위·농지전용 등 관련 허가 신청",
      "한전 계통 연계 신청 지원",
      "허가 완료 후 착공 신고 안내",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">서비스 안내</h1>
          <p className="text-blue-200 text-lg">
            토지 관련 모든 인허가를 원스톱으로 처리합니다
          </p>
        </div>
      </section>

      {/* 서비스 목록 */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-start`}
            >
              {/* 아이콘 + 기본 정보 */}
              <div className="md:w-2/5">
                <div className="bg-[#003087] text-white rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                  <p className="text-blue-200 text-sm mb-4">
                    {service.subtitle}
                  </p>
                  <span className="inline-block bg-[#0057b8] text-white text-sm px-4 py-1.5 rounded-full">
                    {service.period}
                  </span>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="md:w-3/5">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-bold text-[#003087] mb-3">
                    주요 업무 범위
                  </h3>
                  <ul className="space-y-1.5">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <span className="text-[#0057b8] mt-0.5">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#003087] mb-3">처리 절차</h3>
                  <ol className="space-y-2">
                    {service.process.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#003087] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#003087] mb-4">
            어떤 서비스가 필요한지 모르겠다면?
          </h2>
          <p className="text-gray-600 mb-8">
            지번만 알려주시면 어떤 허가가 필요한지 무료로 검토해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-[#003087] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#0057b8] transition-colors"
            >
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

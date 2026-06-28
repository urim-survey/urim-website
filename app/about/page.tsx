import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회사소개 | 우림측량",
  description:
    "우림측량은 강원도 횡성 기반 토지측량 및 인허가 전문 업체입니다. 개발행위허가, 농지전용허가, 태양광 인허가를 전문으로 합니다.",
};

const strengths = [
  {
    icon: "🏆",
    title: "풍부한 현장 경험",
    desc: "강원도 일대 수백 건의 인허가 처리 경험을 바탕으로 토지 조건에 맞는 최적의 방안을 제시합니다.",
  },
  {
    icon: "🔍",
    title: "철저한 사전 검토",
    desc: "허가 신청 전 토지이용규제 정보, 지형 조건, 접도 여건 등을 꼼꼼히 검토하여 허가 가능성을 먼저 확인합니다.",
  },
  {
    icon: "🤝",
    title: "밀착 현장 서비스",
    desc: "담당자가 직접 현장을 방문하여 실제 상황을 파악합니다. 서류상으로만 처리하는 방식과 다릅니다.",
  },
  {
    icon: "📋",
    title: "서류 대행 처리",
    desc: "필요한 모든 서류를 저희가 대행 발급·취합합니다. 고객은 최소한의 준비만 하시면 됩니다.",
  },
  {
    icon: "💬",
    title: "투명한 소통",
    desc: "진행 상황을 정기적으로 안내하고, 어려운 허가 용어도 쉽게 설명해 드립니다.",
  },
  {
    icon: "📍",
    title: "강원도 지역 전문성",
    desc: "횡성 및 강원도 각 지자체의 허가 기준과 담당 공무원 업무 방식을 잘 이해하고 있습니다.",
  },
];

const serviceAreas = [
  "횡성군",
  "원주시",
  "홍천군",
  "평창군",
  "영월군",
  "정선군",
  "강릉시",
  "춘천시",
  "기타 강원도 전 지역",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">회사 소개</h1>
          <p className="text-blue-200 text-lg">
            강원도 횡성 기반 토지측량 및 인허가 전문 업체
          </p>
        </div>
      </section>

      {/* 회사 소개 */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003087] mb-6">
              토지, 제대로 알고 시작하는 것이
              <br />
              가장 중요합니다
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                우림측량은 강원도 횡성을 기반으로 토지측량과 각종 인허가
                업무를 전문으로 처리하는 업체입니다.
              </p>
              <p>
                토지 개발과 인허가는 복잡한 법령과 행정 절차가 얽혀 있어,
                처음 접하시는 분들에게는 어렵고 막막하게 느껴지는 경우가
                많습니다. 저희는 이런 분들의 부담을 덜어드리기 위해,
                토지 검토부터 허가 완료까지 모든 과정을 함께 진행합니다.
              </p>
              <p>
                지번만 알려주시면 개발 가능 여부를 무료로 검토해 드리며,
                현장 방문을 통해 실제 상황에 맞는 정확한 정보를 제공합니다.
                강원도 각 지자체의 허가 절차에 정통한 담당자가
                처음부터 끝까지 직접 담당합니다.
              </p>
            </div>
          </div>
          <div className="bg-[#003087] text-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 border-b border-blue-700 pb-4">
              회사 정보
            </h3>
            <dl className="space-y-4 text-sm">
              {[
                { dt: "상호", dd: "우림측량" },
                { dt: "업종", dd: "토지측량 및 인허가 전문" },
                {
                  dt: "주소",
                  dd: "강원특별자치도 횡성군 태기로 16",
                },
                { dt: "전화", dd: "033-345-1253" },
                { dt: "운영시간", dd: "평일 09:00 ~ 19:00" },
                { dt: "주요 서비스", dd: "개발행위허가 · 농지전용 · 태양광 인허가" },
              ].map((item) => (
                <div key={item.dt} className="flex gap-4">
                  <dt className="text-blue-200 w-24 flex-shrink-0">{item.dt}</dt>
                  <dd className="text-white">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 강점 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003087] mb-3">
              우림측량을 선택하는 이유
            </h2>
            <p className="text-gray-600">
              단순한 서류 대행을 넘어 진정한 파트너가 되겠습니다
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#003087] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 지역 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#003087] mb-4">
            서비스 지역
          </h2>
          <p className="text-gray-600 mb-8">
            횡성군을 중심으로 강원도 전 지역에서 서비스를 제공합니다
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-blue-50 text-[#003087] px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            지금 바로 무료 상담 받으세요
          </h2>
          <p className="text-blue-200 mb-8">
            지번만 알려주시면 무료로 검토해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              033-345-1253 전화하기
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

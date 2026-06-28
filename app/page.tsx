import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="bg-[#003087] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-200 text-sm font-medium mb-3 tracking-widest uppercase">
            강원도 횡성 기반 · 현장 방문 상담 가능
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            토지, 제대로 알고 시작하세요
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-2">
            개발행위허가 · 농지전용 · 태양광 인허가 전문
          </p>
          <p className="text-blue-200 mb-10 max-w-xl mx-auto">
            복잡한 인허가 절차, 저희가 처음부터 끝까지 함께합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg"
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
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-gray-900 font-bold px-8 py-4 rounded-lg opacity-80 cursor-not-allowed text-lg"
              title="준비 중"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              카카오톡으로 문의하기 (준비 중)
            </button>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section className="bg-[#0057b8] text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "초기 상담", value: "무료" },
              { label: "지번만 있어도", value: "상담 가능" },
              { label: "강원도 전역", value: "출장 가능" },
              { label: "원스톱", value: "허가 처리" },
            ].map((item) => (
              <div key={item.label} className="py-2">
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-blue-200 text-sm mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 서비스 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003087] mb-3">
              주요 서비스
            </h2>
            <p className="text-gray-600">
              토지 관련 모든 인허가를 원스톱으로 처리합니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏗️",
                title: "개발행위허가",
                desc: "건축·공작물 설치·토지형질변경 전 반드시 필요한 허가. 부지 검토부터 허가 완료까지 대행합니다.",
                period: "소요기간: 3~8주",
              },
              {
                icon: "🌾",
                title: "농지전용허가",
                desc: "농지를 다른 목적으로 사용하고 싶을 때 필요한 허가. 농지법 요건 검토 및 서류 대행.",
                period: "소요기간: 4~8주",
              },
              {
                icon: "☀️",
                title: "태양광발전 인허가",
                desc: "부지 선정부터 발전사업 허가까지 원스톱 처리. 수익성 분석 및 인허가 가능성 사전 검토.",
                period: "소요기간: 6~12주",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#003087] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="text-xs text-[#0057b8] font-medium bg-blue-50 px-3 py-1 rounded-full">
                  {service.period}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block bg-[#003087] text-white px-8 py-3 rounded-lg hover:bg-[#0057b8] transition-colors font-medium"
            >
              서비스 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 업무 절차 요약 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003087] mb-3">
              간단한 업무 절차
            </h2>
            <p className="text-gray-600">
              지번만 알려주시면 기본 검토를 무료로 해드립니다
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
            {[
              { step: "01", label: "무료 상담" },
              { step: "02", label: "현장 조사" },
              { step: "03", label: "서류 준비" },
              { step: "04", label: "허가 신청" },
              { step: "05", label: "허가 완료" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1 py-4">
                  <div className="w-12 h-12 rounded-full bg-[#003087] text-white flex items-center justify-center font-bold mb-2">
                    {item.step}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                {index < 4 && (
                  <div className="hidden md:block text-[#0057b8] text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/guide"
              className="inline-block border-2 border-[#003087] text-[#003087] px-8 py-3 rounded-lg hover:bg-[#003087] hover:text-white transition-colors font-medium"
            >
              업무절차 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 왜 우림측량인가 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003087] mb-3">
              왜 우림측량인가요?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "📋",
                title: "풍부한 경험",
                desc: "강원도 일대 수백 건의 인허가 처리 경험",
              },
              {
                icon: "🔍",
                title: "사전 검토 무료",
                desc: "지번만 있으면 개발 가능 여부 기본 검토 무료",
              },
              {
                icon: "🤝",
                title: "현장 방문 상담",
                desc: "담당자가 직접 현장 방문하여 꼼꼼히 확인",
              },
              {
                icon: "📍",
                title: "강원도 전문",
                desc: "횡성·강원도 일대 규정과 지자체 절차에 정통",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#003087] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            지금 바로 무료 상담 받으세요
          </h2>
          <p className="text-blue-200 mb-8">
            지번만 알려주시면 개발 가능 여부를 기본 검토해 드립니다.
            <br className="hidden sm:block" />
            접수 후 1영업일 이내 연락드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
              </svg>
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
    </>
  );
}

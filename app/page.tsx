import Link from "next/link";

const services = [
  {
    num: "01",
    title: "개발행위허가",
    desc: "건축·공작물 설치·토지형질변경 전 반드시 필요한 허가입니다. 부지 검토부터 허가 완료까지 모든 과정을 대행합니다.",
    period: "3 – 8주",
    href: "/services",
    image: "/images/service-dev.jpg",
    imageAlt: "개발행위허가 현장",
  },
  {
    num: "02",
    title: "농지전용허가",
    desc: "농지를 다른 목적으로 사용하고 싶을 때 필요한 허가입니다. 농지법 요건 검토 및 서류 준비를 원스톱으로 처리합니다.",
    period: "4 – 8주",
    href: "/services",
    image: "/images/service-farm.jpg",
    imageAlt: "농지전용허가 현장",
  },
  {
    num: "03",
    title: "태양광발전 인허가",
    desc: "부지 선정부터 발전사업 허가까지 원스톱으로 처리합니다. 수익성 분석 및 인허가 가능성 사전 검토를 제공합니다.",
    period: "6 – 12주",
    href: "/services",
    image: "/images/service-solar.jpg",
    imageAlt: "태양광발전 인허가 현장",
  },
];

const steps = [
  { num: "01", title: "무료 상담",  desc: "지번만 알려주시면 기본 검토 무료 진행" },
  { num: "02", title: "현장 조사",  desc: "담당자 직접 방문, 지형·접도·환경 확인" },
  { num: "03", title: "서류 준비",  desc: "허가 종류에 맞는 서류 대행 취합" },
  { num: "04", title: "허가 신청",  desc: "관할 지자체 접수 및 공무원 협의" },
  { num: "05", title: "허가 완료",  desc: "허가증 전달 및 후속 절차 안내" },
];

export default function HomePage() {
  return (
    <>
      {/* ── 히어로 ── */}
      <section
        className="relative flex flex-col items-center justify-center text-white px-6 overflow-hidden"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {/* 배경 이미지 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 네이비 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#003087]/90 via-[#003087]/80 to-[#001f5c]/95" />

        {/* 콘텐츠 */}
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <p className="text-blue-300 text-xs sm:text-sm tracking-[0.35em] uppercase mb-10">
            강원도 횡성 기반 &nbsp;·&nbsp; 토지측량 및 인허가 전문
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            토지, 제대로<br className="sm:hidden" /> 알고&nbsp;
            <br className="hidden sm:block" />
            시작하세요
          </h1>
          <div className="w-14 h-px bg-blue-400 mx-auto mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-4">
            개발행위허가 · 농지전용 · 태양광 인허가 전문
          </p>
          <p className="text-blue-300 text-sm sm:text-base mb-14">
            복잡한 인허가 절차, 저희가 처음부터 끝까지 함께합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2.5 bg-white text-[#003087] font-bold px-10 py-4 hover:bg-blue-50 transition-colors text-base tracking-wide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
              </svg>
              033-345-1253 &nbsp; 전화 상담
            </a>
            <button
              disabled
              title="준비 중"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FEE500] text-gray-900 font-bold px-10 py-4 opacity-70 cursor-not-allowed text-base tracking-wide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              카카오톡 상담 &nbsp;
              <span className="text-xs font-normal opacity-70">(준비 중)</span>
            </button>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400 animate-bounce z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 신뢰 지표 띠 ── */}
      <section className="bg-[#001f5c] text-white py-5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-900">
          {[
            { value: "무료",       label: "초기 상담·기본 검토" },
            { value: "지번만",     label: "있으면 상담 가능" },
            { value: "강원도 전역", label: "현장 출장 가능" },
            { value: "원스톱",     label: "인허가 처리" },
          ].map((item) => (
            <div key={item.label} className="text-center py-3 px-4">
              <div className="text-lg font-bold">{item.value}</div>
              <div className="text-blue-400 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 주요 서비스 ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#0057b8] text-xs tracking-[0.3em] uppercase mb-3">Services</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">주요 서비스</h2>
            </div>
            <Link
              href="/services"
              className="text-sm text-[#003087] font-medium border-b border-[#003087] pb-0.5 hover:text-[#0057b8] hover:border-[#0057b8] transition-colors self-start sm:self-auto"
            >
              서비스 전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
            {services.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 overflow-hidden flex flex-col"
              >
                {/* 이미지 영역 */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-[#003087] opacity-0 group-hover:opacity-60 transition-opacity duration-400" />
                </div>

                {/* 텍스트 */}
                <div className="px-8 py-8 flex-1 flex flex-col group-hover:bg-[#003087] transition-colors duration-300">
                  <span className="block text-5xl font-bold text-gray-100 group-hover:text-[#002060] transition-colors mb-5 leading-none select-none">
                    {s.num}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-blue-200 text-sm leading-relaxed mb-6 transition-colors flex-1">
                    {s.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#0057b8] group-hover:text-blue-300 font-medium transition-colors">
                      소요기간 {s.period}
                    </span>
                    <span className="text-gray-300 group-hover:text-blue-300 transition-colors text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 강원도 횡성 풍경 띠 ── */}
      <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gangwon-view.jpg"
          alt="강원특별자치도 횡성 전경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#001a3d]/55" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60 mb-3">Our Location</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            강원특별자치도 횡성
          </h3>
          <p className="text-white/70 text-sm sm:text-base">
            태기로 16 · 강원도 전 지역 현장 출장 가능
          </p>
        </div>
      </div>

      {/* ── 업무 절차 ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#0057b8] text-xs tracking-[0.3em] uppercase mb-3">Process</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">업무 절차</h2>
            </div>
            <Link
              href="/guide"
              className="text-sm text-[#003087] font-medium border-b border-[#003087] pb-0.5 hover:text-[#0057b8] hover:border-[#0057b8] transition-colors self-start sm:self-auto"
            >
              절차 자세히 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 border-t border-gray-300">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative border-b sm:border-b-0 sm:border-r border-gray-300 last:border-r-0 px-6 py-10"
              >
                {i < steps.length - 1 && (
                  <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg z-10">›</span>
                )}
                <span className="block text-4xl font-bold text-gray-100 leading-none mb-5 select-none">{step.num}</span>
                <h3 className="text-base font-bold text-[#003087] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { type: "개발행위허가", period: "3 – 8주" },
              { type: "농지전용허가",  period: "4 – 8주" },
              { type: "태양광 인허가", period: "6 – 12주" },
            ].map((item) => (
              <div key={item.type} className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4">
                <span className="text-sm text-gray-600">{item.type}</span>
                <span className="text-sm font-bold text-[#003087]">평균 {item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 문의 섹션 ── */}
      <section className="bg-[#003087] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* 왼쪽: 텍스트 + 전화번호 */}
          <div className="px-8 sm:px-12 py-20">
            <p className="text-blue-300 text-xs tracking-[0.3em] uppercase mb-6">Free Consultation</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              지금 바로<br />무료 상담 받으세요
            </h2>
            <p className="text-blue-200 leading-relaxed mb-10">
              지번만 알려주시면 개발 가능 여부를 무료로 검토해 드립니다.
              <br />
              접수 후 1영업일 이내 연락드립니다.
            </p>

            <a href="tel:033-345-1253" className="block group mb-8">
              <p className="text-blue-400 text-xs tracking-widest uppercase mb-2">
                전화 상담 &nbsp; 평일 09:00 – 19:00
              </p>
              <p className="text-4xl sm:text-5xl font-bold tracking-tight group-hover:text-blue-200 transition-colors">
                033-345-1253
              </p>
            </a>

            <div className="w-full h-px bg-blue-800 mb-8" />

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:033-345-1253"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-6 py-4 hover:bg-blue-50 transition-colors text-sm tracking-wide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
                </svg>
                전화 상담
              </a>
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 border border-white text-white font-bold px-6 py-4 hover:bg-white hover:text-[#003087] transition-colors text-sm tracking-wide"
              >
                온라인 문의
              </Link>
            </div>
          </div>

          {/* 오른쪽: 이미지 (모바일 숨김) */}
          <div className="relative hidden md:block min-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/contact-call.jpg"
              alt="전화 상담"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003087] via-[#003087]/40 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

const services = [
  {
    title: "개발행위허가",
    desc: "부지 검토부터 허가 완료까지 전 과정을 대행합니다.",
    period: "3 – 8주",
    href: "/services",
    image: "/images/service-dev.jpg",
  },
  {
    title: "농지전용허가",
    desc: "농지법 요건 검토 및 서류 준비를 원스톱으로 처리합니다.",
    period: "4 – 8주",
    href: "/services",
    image: "/images/service-farm.jpg",
  },
  {
    title: "태양광발전 인허가",
    desc: "부지 선정부터 발전사업 허가까지 원스톱으로 처리합니다.",
    period: "6 – 12주",
    href: "/services",
    image: "/images/service-solar.jpg",
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
      <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#001a3d]/65" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.08] tracking-tight mb-6">
            토지, 제대로<br />시작하세요
          </h1>
          <p className="text-lg sm:text-xl text-white/65 mb-14 tracking-wide">
            개발행위허가 · 농지전용 · 태양광 인허가 전문
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
              카카오톡 상담 &nbsp;
              <span className="text-xs font-normal opacity-70">(준비 중)</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 주요 서비스 ── */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <p className="text-[#0057b8] text-xs tracking-[0.3em] uppercase mb-4">Services</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">주요 서비스</h2>
            <Link
              href="/services"
              className="text-sm text-[#003087] font-medium border-b border-[#003087] pb-0.5 hover:text-[#0057b8] hover:border-[#0057b8] transition-colors self-start sm:self-auto"
            >
              서비스 전체 보기 →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative h-80 md:h-[520px] overflow-hidden block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-[#003087]/80 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white">{s.title}</h3>
                <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
                  <p className="text-blue-200 text-sm mt-3 leading-relaxed">{s.desc}</p>
                  <span className="text-white/60 text-xs block mt-2">소요기간 {s.period} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 강원도 횡성 풍경 띠 ── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gangwon-view.jpg"
          alt="강원특별자치도 횡성 전경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#001a3d]/55" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h3 className="text-3xl sm:text-4xl font-bold mb-2">강원특별자치도 횡성</h3>
          <p className="text-white/65 text-sm sm:text-base">태기로 16 · 강원도 전 지역 현장 출장 가능</p>
        </div>
      </div>

      {/* ── 업무 절차 ── */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[#0057b8] text-xs tracking-[0.3em] uppercase mb-4">Process</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">업무 절차</h2>
              <Link
                href="/guide"
                className="text-sm text-[#003087] font-medium border-b border-[#003087] pb-0.5 hover:text-[#0057b8] hover:border-[#0057b8] transition-colors self-start sm:self-auto"
              >
                절차 자세히 보기 →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 border-t border-gray-300">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative border-b sm:border-b-0 sm:border-r border-gray-300 last:border-r-0 px-6 py-12"
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
        </div>
      </section>

      {/* ── 하단 문의 섹션 ── */}
      <section className="bg-[#003087] text-white py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-300 text-xs tracking-[0.3em] uppercase mb-6">Free Consultation</p>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">지금 바로 무료 상담</h2>
          <p className="text-blue-200 mb-14">
            지번만 알려주시면 개발 가능 여부를 무료로 검토해 드립니다.
          </p>

          <a href="tel:033-345-1253" className="block mb-12 group">
            <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">평일 09:00 – 19:00</p>
            <p className="text-5xl sm:text-6xl font-bold tracking-tight group-hover:text-blue-200 transition-colors">
              033-345-1253
            </p>
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003087] font-bold px-10 py-4 hover:bg-blue-50 transition-colors text-sm tracking-wide"
            >
              전화 상담
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white text-white font-bold px-10 py-4 hover:bg-white hover:text-[#003087] transition-colors text-sm tracking-wide"
            >
              온라인 문의
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

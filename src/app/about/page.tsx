import HeroSection from "../../components/HeroSection";
import { FadeInSection } from "../../components/FadeInSection";

const strengths = [
  {
    title: "10년 실무 경력",
    desc: "횡성군청에서 쌓은 행정 실무 경험을 바탕으로 인허가 절차를 정확하게 처리합니다.",
  },
  {
    title: "강원 지역 전반 대응",
    desc: "횡성·원주·평창·홍천 등 강원 지역 전반의 토지 측량 및 인허가 업무를 지원합니다.",
  },
  {
    title: "토지 인허가 전문",
    desc: "개발행위·농지전용·산지전용·태양광·도로점용·현황측량까지 모든 절차를 담당합니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <HeroSection
        engLabel="ABOUT"
        title="회사소개"
        imageSrc="/images/about-team.jpg"
        imageAlt="횡성우림측량 사무실"
      />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <p className="text-lg text-ink max-w-2xl leading-relaxed">
              횡성군 소재 측량사무소입니다. 개발행위·농지전용·산지전용·태양광·도로점용·현황측량 등
              토지 인허가에 필요한 모든 측량 업무를 담당합니다. 횡성군청 10년 실무 경력을 바탕으로
              행정 절차를 정확하고 신속하게 처리합니다.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20 bg-bg-soft">
        <div className="container">
          <div className="eng-label">WHY US</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">강점</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((s) => (
              <FadeInSection key={s.title}>
                <div className="border-t-2 border-ink pt-6">
                  <div className="font-semibold text-ink">{s.title}</div>
                  <div className="mt-2 text-sm text-secondary">{s.desc}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="eng-label">LOCATION</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 text-ink">오시는 길</h2>
          <div className="text-ink">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
          <div className="mt-1 text-secondary">전화: 033-345-1253</div>
          <div className="mt-6 w-full h-72 bg-bg-soft flex items-center justify-center text-secondary text-sm">
            구글 지도 위치 삽입 예정
          </div>
        </div>
      </section>
    </div>
  );
}

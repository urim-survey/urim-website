import type { Metadata } from "next";
import HeroSection from "../../components/HeroSection";
import ServiceCard from "../../components/ServiceCard";
import { FadeInSection, FadeInGrid, FadeInItem } from "../../components/FadeInSection";

export const metadata: Metadata = {
  title: "서비스안내",
  description:
    "개발행위허가·농지전용·산지전용·태양광 인허가·도로점용·현황측량까지, 횡성우림측량의 전문 서비스를 안내합니다.",
};

const services = [
  { id: "development", title: "개발행위허가", description: "토지 개발을 위한 인허가 전 과정(현장조사, 설계 협의, 신청 등)을 대행합니다.", imageSrc: "/images/service-1.jpg" },
  { id: "farmland", title: "농지전용", description: "농지를 대지 또는 잡종지로 전환하기 위한 법적 절차를 지원합니다.", imageSrc: "/images/service-2.jpg" },
  { id: "forest", title: "산지전용", description: "산지를 다른 용도로 전환하기 위한 인허가 절차를 대행합니다.", imageSrc: "/images/service-3.jpg" },
  { id: "solar", title: "태양광 인허가", description: "태양광 발전설비 설치를 위한 인허가 및 관련 측량을 일괄 처리합니다.", imageSrc: "/images/service-4.jpg" },
  { id: "road", title: "도로점용", description: "도로 점용을 위한 허가 신청 및 관련 절차를 지원합니다.", imageSrc: "/images/service-5.jpg" },
  { id: "survey", title: "현황측량", description: "토지 현황을 정확히 파악하는 측량 업무를 수행합니다.", imageSrc: "/images/service-6.jpg" },
];

export default function ServicesPage() {
  return (
    <div>
      <HeroSection
        engLabel="OUR SERVICES"
        title="서비스 안내"
        subtitle="횡성우림측량의 핵심 서비스 6종입니다."
        imageSrc="/images/service-1.jpg"
        imageAlt="측량 서비스"
      />

      <section className="py-20">
        <div className="container">
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <FadeInItem key={s.id}>
                <ServiceCard title={s.title} description={s.description} href={`#${s.id}`} imageSrc={s.imageSrc} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-16 ${i % 2 === 1 ? "bg-bg-soft" : ""}`}>
          <div className="container">
            <FadeInSection>
              <h2 className="text-2xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-3 text-secondary max-w-2xl">{s.description}</p>
            </FadeInSection>
          </div>
        </section>
      ))}
    </div>
  );
}

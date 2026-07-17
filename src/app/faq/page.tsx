import type { Metadata } from "next";
import HeroSection from "../../components/HeroSection";
import FaqAccordion from "../../components/FaqAccordion";
import { FadeInSection } from "../../components/FadeInSection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "측량 비용, 인허가 기간, 농지전용 가능 여부 등 자주 묻는 질문을 모았습니다.",
};

const faqs = [
  { q: "측량 비용은 어떻게 되나요?", a: "거리와 면적, 현장 조건에 따라 다릅니다. 문의주시면 견적 드립니다." },
  { q: "인허가 기간은 얼마나 걸리나요?", a: "관할 기관과 서류 준비 상태에 따라 다르며 보통 몇 주에서 몇 달 정도 소요됩니다." },
  { q: "농지전용이 가능한지 어떻게 확인하나요?", a: "현장 확인 후 관련 법령과 지적도를 통해 판단해 드립니다." },
];

export default function FAQPage() {
  return (
    <div>
      <HeroSection engLabel="FAQ" title="자주 묻는 질문" imageSrc="/images/hero-main.jpg" imageAlt="FAQ" />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <FaqAccordion faqs={faqs} />
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

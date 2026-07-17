import type { Metadata } from "next";
import HeroSection from "../../components/HeroSection";
import StepTimeline from "../../components/StepTimeline";
import { FadeInSection } from "../../components/FadeInSection";

export const metadata: Metadata = {
  title: "업무절차",
  description:
    "상담부터 현장확인·서류준비·인허가 신청·완료까지, 횡성우림측량의 업무 진행 절차를 안내합니다.",
};

const steps = [
  { title: "상담", desc: "요구사항 확인 및 초기 상담 (예상 1~3일)" },
  { title: "현장확인", desc: "현장 방문 및 기초 측량 (예상 1~7일)" },
  { title: "서류준비", desc: "신청서 및 관련 서류 준비" },
  { title: "인허가 신청", desc: "관할 기관에 서류 제출 및 대응" },
  { title: "완료", desc: "허가 완료 및 사후관리" },
];

export default function GuidePage() {
  return (
    <div>
      <HeroSection
        engLabel="WORK PROCESS"
        title="업무절차"
        subtitle="의뢰부터 완료까지의 일반적인 절차와 예상 기간을 안내합니다."
        imageSrc="/images/hero-main.jpg"
        imageAlt="업무절차"
      />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <StepTimeline steps={steps} />
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

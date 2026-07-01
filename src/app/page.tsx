import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import { FadeInSection, FadeInGrid, FadeInItem } from "../components/FadeInSection";

const featuredServices = [
  {
    title: "개발행위허가",
    description: "토지 개발을 위한 인허가 전 과정을 대행합니다.",
    href: "/services#development",
    imageSrc: "/images/service-1.jpg",
  },
  {
    title: "농지전용",
    description: "농지를 대지·잡종지로 전환하는 절차를 지원합니다.",
    href: "/services#farmland",
    imageSrc: "/images/service-2.jpg",
  },
  {
    title: "태양광 인허가",
    description: "태양광 발전소 설치 인허가 및 측량을 일괄 처리합니다.",
    href: "/services#solar",
    imageSrc: "/images/service-4.jpg",
  },
];

const recentPosts = [
  { slug: "post-1", title: "블로그 글 샘플 1", date: "2026-06-01", imageSrc: "/images/blog-post-1.jpg" },
  { slug: "post-2", title: "블로그 글 샘플 2", date: "2026-05-20", imageSrc: "/images/blog-post-2.jpg" },
  { slug: "post-3", title: "블로그 글 샘플 3", date: "2026-04-15", imageSrc: "/images/blog-post-3.jpg" },
];

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection
        engLabel="HOENGSEONG URIM SURVEY"
        title="정확한 측량, 확실한 인허가"
        subtitle="횡성군청 10년 실무경력으로 토지 인허가의 모든 절차를 책임집니다."
        imageSrc="/images/hero-main.jpg"
        imageAlt="횡성우림측량 현장 사진"
        size="full"
      >
        <div className="mt-8 flex gap-4">
          <Button href="/contact" variant="inverted">상담 문의하기</Button>
          <Button href="tel:033-345-1253" variant="text">033-345-1253</Button>
        </div>
      </HeroSection>

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <div className="eng-label">OUR SERVICES</div>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">핵심 서비스</h2>
          </FadeInSection>
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((s) => (
              <FadeInItem key={s.title}>
                <ServiceCard {...s} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      <section className="py-20 bg-bg-soft">
        <div className="container">
          <FadeInSection>
            <div className="eng-label">RECENT NEWS</div>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">최근 소식</h2>
          </FadeInSection>
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((p) => (
              <FadeInItem key={p.slug}>
                <BlogCard {...p} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      <section className="w-full bg-ink text-white py-16">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">상담이 필요하신가요?</h3>
            <p className="mt-2 text-white/80">지금 바로 문의주시면 빠르게 도와드리겠습니다.</p>
          </div>
          <Button href="/contact" variant="inverted">상담 문의</Button>
        </div>
      </section>
    </div>
  );
}

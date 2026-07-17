import type { Metadata } from "next";
import HeroSection from "../../components/HeroSection";
import { FadeInSection } from "../../components/FadeInSection";

export const metadata: Metadata = {
  title: "문의상담",
  description:
    "횡성우림측량 전화·카카오톡 상담 안내. 033-345-1253, 평일 09:00~19:00.",
};

// 카카오톡 채널 만들어지면 실제 채널 URL(https://pf.kakao.com/_xxxxx)로 교체
const KAKAO_CHANNEL_URL = "#";

const MAP_ADDRESS = "강원특별자치도 횡성군 태기로 16";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&output=embed`;

export default function ContactPage() {
  return (
    <div>
      <HeroSection engLabel="CONTACT" title="문의상담" imageSrc="/images/hero-main.jpg" imageAlt="문의상담" />

      <section className="py-20">
        <div className="container max-w-2xl">
          <FadeInSection className="text-center">
            <p className="text-secondary">
              토지측량·인허가 관련 문의는 전화 또는 카카오톡으로 가장 빠르고 정확하게 상담받으실 수 있습니다.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:033-345-1253"
                className="px-8 py-5 bg-ink text-white text-lg font-semibold rounded-lg hover:bg-hover transition-colors"
              >
                전화 상담하기 033-345-1253
              </a>
              <a
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-[#FEE500] text-black text-lg font-semibold rounded-lg hover:brightness-95 transition-all"
              >
                카카오톡 상담하기
              </a>
            </div>

            <div className="mt-6 text-sm text-secondary">
              평일 09:00 - 19:00 (주말·공휴일 휴무)
            </div>
          </FadeInSection>

          <FadeInSection className="mt-20 pt-12 border-t border-line">
            <h2 className="text-xl font-semibold text-ink">오시는 길</h2>
            <div className="mt-4 text-ink">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
            <div className="mt-1 text-secondary">전화: 033-345-1253</div>
            <div className="mt-8 w-full h-64 rounded-lg overflow-hidden border border-line">
              <iframe
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="횡성우림측량 위치"
              />
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

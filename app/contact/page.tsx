import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "문의상담 | 우림측량",
  description:
    "우림측량에 문의하세요. 전화 상담(033-345-1253) 또는 온라인 문의폼으로 접수 가능합니다.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">문의 상담</h1>
          <p className="text-blue-200 text-lg">
            궁금하신 점을 부담 없이 문의해 주세요
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div>
            <h2 className="text-2xl font-bold text-[#003087] mb-8">
              연락 방법
            </h2>
            <div className="space-y-6">
              {/* 전화 */}
              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-[#003087] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#003087] mb-1">전화 상담</div>
                  <a
                    href="tel:033-345-1253"
                    className="text-2xl font-bold text-gray-900 hover:text-[#0057b8] transition-colors"
                  >
                    033-345-1253
                  </a>
                  <div className="text-sm text-gray-500 mt-1">
                    평일 09:00 ~ 19:00
                  </div>
                </div>
              </div>

              {/* 카카오톡 */}
              <div className="flex items-start gap-4 p-5 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-[#FEE500] text-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    카카오톡 상담
                  </div>
                  <div className="text-gray-500 text-sm">준비 중입니다</div>
                </div>
              </div>

              {/* 주소 */}
              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-700 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">사무실 주소</div>
                  <div className="text-gray-700">
                    강원특별자치도 횡성군 태기로 16
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    현장 방문 상담도 가능합니다
                  </div>
                </div>
              </div>
            </div>

            {/* 안내 사항 */}
            <div className="mt-8 p-5 bg-[#003087] text-white rounded-xl">
              <h3 className="font-bold mb-3">📋 상담 접수 안내</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• 온라인 문의 접수 후 1영업일 이내 연락드립니다</li>
                <li>• 지번만 있으면 기본 검토가 무료로 진행됩니다</li>
                <li>• 긴급한 경우 전화 상담을 이용하세요</li>
                <li>• 개인정보는 상담 목적으로만 사용됩니다</li>
              </ul>
            </div>
          </div>

          {/* 문의 폼 */}
          <div>
            <h2 className="text-2xl font-bold text-[#003087] mb-8">
              온라인 문의
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

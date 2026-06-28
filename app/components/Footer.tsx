import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#003087] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-3">우림측량</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              토지측량 및 인허가 전문 업체
              <br />
              개발행위허가 · 농지전용 · 태양광 인허가
              <br />
              강원도 횡성 기반 · 현장 방문 상담 가능
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-bold mb-3">연락처</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.24 2.47.69 3.58a1 1 0 01-.24 1.01l-2.33 2.2z" />
                </svg>
                <span>
                  <a href="tel:033-345-1253" className="hover:text-white">
                    033-345-1253
                  </a>
                  <br />
                  평일 09:00 ~ 19:00
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>강원특별자치도 횡성군 태기로 16</span>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="text-lg font-bold mb-3">바로가기</h3>
            <ul className="space-y-1.5 text-sm text-blue-200">
              {[
                { href: "/about", label: "회사소개" },
                { href: "/services", label: "서비스안내" },
                { href: "/guide", label: "업무절차" },
                { href: "/faq", label: "자주 묻는 질문" },
                { href: "/contact", label: "문의상담" },
                { href: "/blog", label: "블로그" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-800 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} 우림측량. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-line">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <div className="font-bold text-lg text-ink">횡성우림측량</div>
            <div className="text-sm mt-2 text-secondary">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
            <div className="text-sm mt-1 text-secondary">전화: 033-345-1253</div>
            <a href="#" className="inline-block mt-4 text-sm border-b border-ink text-ink">
              카카오톡 상담
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="font-semibold text-ink">서비스</div>
              <ul className="mt-3 text-sm text-secondary space-y-2">
                <li><Link href="/services">서비스안내</Link></li>
                <li><Link href="/guide">업무절차</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink">고객지원</div>
              <ul className="mt-3 text-sm text-secondary space-y-2">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">문의상담</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line text-sm text-secondary">
          © {new Date().getFullYear()} 횡성우림측량. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

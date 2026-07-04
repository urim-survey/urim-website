"use client";

import { useState } from "react";
import HeroSection from "../../components/HeroSection";
import { FadeInSection } from "../../components/FadeInSection";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "개발행위허가", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      setForm({ name: '', phone: '', type: '개발행위허가', message: '' });
    } else {
      alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <HeroSection engLabel="CONTACT" title="문의상담" imageSrc="/images/hero-main.jpg" imageAlt="문의상담" />

      <section className="py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeInSection>
            <h2 className="text-xl font-semibold text-ink">오시는 길</h2>
            <div className="mt-4 text-ink">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
            <div className="mt-1 text-secondary">전화: 033-345-1253</div>
            <div className="mt-8 w-full h-64 bg-bg-soft flex items-center justify-center text-secondary text-sm">
              구글 지도 위치 삽입 예정
            </div>
          </FadeInSection>

          <FadeInSection>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink">이름</label>
                <input
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">연락처</label>
                <input
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">문의유형</label>
                <select
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>개발행위허가</option>
                  <option>농지전용</option>
                  <option>산지전용</option>
                  <option>태양광 인허가</option>
                  <option>도로점용</option>
                  <option>현황측량</option>
                  <option>기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">내용</label>
                <textarea
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="bg-ink text-white px-6 py-3 hover:bg-hover transition-colors">
                문의 보내기
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

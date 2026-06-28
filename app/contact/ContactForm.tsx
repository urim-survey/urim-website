"use client";

import { useState } from "react";
import { submitContact } from "../actions/contact";

const inquiryTypes = [
  "개발행위허가",
  "농지전용허가",
  "태양광발전 인허가",
  "기타 문의",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    inquiry_type: "",
    land_address: "",
    content: "",
    privacy_agreed: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy_agreed) {
      setStatus("error");
      setMessage("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setStatus("loading");
    const result = await submitContact(form);
    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setForm({
        name: "",
        phone: "",
        inquiry_type: "",
        land_address: "",
        content: "",
        privacy_agreed: false,
      });
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          문의가 접수되었습니다!
        </h3>
        <p className="text-green-700 mb-6">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-[#003087] text-white px-6 py-2.5 rounded-lg hover:bg-[#0057b8] transition-colors"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="홍길동"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent"
        />
      </div>

      {/* 연락처 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="010-0000-0000"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent"
        />
      </div>

      {/* 문의유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          문의유형
        </label>
        <select
          name="inquiry_type"
          value={form.inquiry_type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent bg-white"
        >
          <option value="">선택해 주세요</option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 토지주소 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          토지주소{" "}
          <span className="text-gray-400 font-normal text-xs">(선택)</span>
        </label>
        <input
          type="text"
          name="land_address"
          value={form.land_address}
          onChange={handleChange}
          placeholder="예: 강원도 횡성군 횡성읍 123-45"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">
          지번 또는 도로명 주소를 입력해 주세요
        </p>
      </div>

      {/* 문의내용 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          문의내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          placeholder="문의하실 내용을 자유롭게 작성해 주세요."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent resize-none"
        />
      </div>

      {/* 개인정보 동의 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          수집 항목: 이름, 연락처, 문의내용
          <br />
          수집 목적: 상담 및 문의 응대
          <br />
          보유 기간: 상담 완료 후 1년
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="privacy_agreed"
            checked={form.privacy_agreed}
            onChange={handleChange}
            className="w-4 h-4 accent-[#003087]"
          />
          <span className="text-sm text-gray-700">
            개인정보 수집·이용에 동의합니다{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      {/* 에러 메시지 */}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#003087] text-white font-bold py-4 rounded-lg hover:bg-[#0057b8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
      >
        {status === "loading" ? "접수 중..." : "문의 접수하기"}
      </button>
    </form>
  );
}

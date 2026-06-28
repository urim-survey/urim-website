"use server";

import { createServiceClient } from "../lib/supabase";

export type ContactFormData = {
  name: string;
  phone: string;
  inquiry_type: string;
  land_address: string;
  content: string;
  privacy_agreed: boolean;
};

export async function submitContact(data: ContactFormData) {
  const supabase = createServiceClient();

  const { error } = await supabase.from("contacts").insert([
    {
      name: data.name,
      phone: data.phone,
      inquiry_type: data.inquiry_type,
      land_address: data.land_address || null,
      content: data.content,
      privacy_agreed: data.privacy_agreed,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, message: "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  return { success: true, message: "문의가 정상적으로 접수되었습니다. 1영업일 이내에 연락드리겠습니다." };
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 });

  const { name, phone, type, message } = body;

  const { error } = await supabaseAdmin.from('contacts').insert({
    name,
    phone,
    inquiry_type: type,
    content: message,
  });

  if (error) {
    console.error('Supabase insert error:', error.message);
    return NextResponse.json({ ok: false, error: '저장에 실패했습니다.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

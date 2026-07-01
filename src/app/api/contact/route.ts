import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  // TODO: integrate with Supabase to persist contact submissions
  console.log('Contact form received:', body);
  return NextResponse.json({ ok: true });
}

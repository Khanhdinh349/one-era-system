import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone, email, agency, company, target, date, time, note } = body;

    // 1. Kiểm tra dữ liệu đầu vào (Server-side Validation)
    if (!name || !phone) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // 2. Chống trùng lặp (Ví dụ: SĐT không được đăng ký cùng 1 ngày 2 lần)
    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('phone', phone)
      .eq('visit_date', date)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Số điện thoại này đã có lịch hẹn trong ngày này' }, { status: 409 });
    }

    // 3. Lưu vào Database
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        { 
          category: type, // visitor, agency, partner
          full_name: name,
          phone_number: phone,
          email: email,
          organization: agency || company || '', // Tên đại lý hoặc công ty đối tác
          visit_area: target, // Sa bàn, Nhà mẫu, Immersion Room
          visit_date: date,
          visit_time: time,
          note: note,
          status: 'pending' // Mặc định là chờ xác nhận
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ message: 'Lưu dữ liệu thành công', data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
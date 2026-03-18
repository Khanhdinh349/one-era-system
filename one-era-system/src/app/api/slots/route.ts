// Logic chia nhỏ thời gian
export async function GET(request: Request) {
  const immersionSlots = []; // Mỗi 25 phút
  const modelHouseSlots = []; // Mỗi 1 tiếng 30 phút

  // Ví dụ tạo slot cho Immersion (9h - 17h)
  let start = new Date();
  start.setHours(9, 0, 0);
  while(start.getHours() < 17) {
    immersionSlots.push(start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    start.setMinutes(start.getMinutes() + 25);
  }
  
  // Sau đó so khớp với Database, nếu slot nào đã có 25 người đặt thì đánh dấu "full"
  return Response.json({ immersionSlots, modelHouseSlots });
}
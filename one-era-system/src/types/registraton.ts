const handleSubmit = async () => {
  if (!handleValidation()) return;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'visitor', // hoặc agency/partner tùy trang
      ...formData,
      target: activeMain ? (activeMain === 'sa-ban' ? 'Sa bàn' : 'Nhà mẫu') : 'Immersion Room',
      date: selectedDate,
      time: selectedMainTime
    })
  });

  const result = await response.json();
  
  if (response.ok) {
    // Chuyển sang trang xác nhận thành công
    router.push(`/register/confirmation?type=visitor&name=${formData.name}...`);
  } else {
    alert(result.error); // Hiển thị lỗi từ server
  }
};
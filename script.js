// 1. MẢNG DỮ LIỆU MẪU (Danh sách các sản phẩm / dịch vụ)
const danhSachDichVu = [
  {
    id: 1,
    ten: "Tour Hà Giang - Cao Nguyên Đá 3N2Đ",
    khuVuc: "Miền Bắc",
    gia: 3250000,
    hinhAnh: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    moTa: "Chinh phục đèo Mã Pí Lèng, du thuyền sông Nho Quế và khám phá bản làng vùng cao."
  },
  {
    id: 2,
    ten: "Du Thuyền Vịnh Hạ Long 5 Sao 2N1Đ",
    khuVuc: "Miền Bắc",
    gia: 4100000,
    hinhAnh: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
    moTa: "Trải nghiệm nghỉ dưỡng trên vịnh kỳ quan, chèo thuyền Kayak và thăm hang Sửng Sốt."
  },
  {
    id: 3,
    ten: "Tour Đà Nẵng - Phố Cổ Hội An - Bà Nà",
    khuVuc: "Miền Trung",
    gia: 2950000,
    hinhAnh: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=800&q=80",
    moTa: "Check-in Cầu Vàng Bà Nà Hills, thả đèn hoa đăng trên sông Hoài và thưởng thức ẩm thực."
  },
  {
    id: 4,
    ten: "Khám Phá Cố Đô Huế - Quảng Bình",
    khuVuc: "Miền Trung",
    gia: 3400000,
    hinhAnh: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
    moTa: "Tham quan Đại Nội Huế, lăng tẩm vua Nguyễn và khám phá kỳ quan động Phong Nha."
  },
  {
    id: 5,
    ten: "Tour Miền Tây - Chợ Nổi Cái Răng",
    khuVuc: "Miền Nam",
    gia: 1650000,
    hinhAnh: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?auto=format&fit=crop&w=800&q=80",
    moTa: "Trải nghiệm văn hóa sông nước Cần Thơ, thưởng thức trái cây miệt vườn và đờn ca tài tử."
  },
  {
    id: 6,
    ten: "Nghỉ Dưỡng Đảo Ngọc Phú Quốc 4N3Đ",
    khuVuc: "Miền Nam",
    gia: 4850000,
    hinhAnh: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&q=80",
    moTa: "Lặn ngắm san hô quần đảo An Thới, đi cáp treo Hòn Thơm và ngắm hoàng hôn biển."
  }
];

// 2. HÀM HIỂN THỊ DANH SÁCH SẢN PHẨM BẰNG VÒNG LẶP
function hienThiDanhSach(danhSach, idKhungChua) {
  const container = document.getElementById(idKhungChua);

  // Kiểm tra sự tồn tại của thẻ HTML
  if (!container) {
    console.error(`Không tìm thấy thẻ HTML có id="${idKhungChua}"`);
    return;
  }

  // Xóa nội dung cũ trước khi render mới
  container.innerHTML = "";

  // Kiểm tra nếu mảng dữ liệu rỗng
  if (!danhSach || danhSach.length === 0) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm/dịch vụ nào phù hợp.</p>";
    return;
  }

  // Khởi tạo biến lưu chuỗi HTML
  let chuoiHTML = "";

  // Dùng vòng lặp forEach duyệt qua từng phần tử trong danh sách dữ liệu
  danhSach.forEach((sanPham) => {
    // Định dạng số tiền sang chuẩn VNĐ (Ví dụ: 3.250.000 ₫)
    const giaTien = sanPham.gia.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND"
    });

    // Cộng dồn cấu trúc HTML của từng sản phẩm
    chuoiHTML += `
      <div class="product-card" data-id="${sanPham.id}">
        <div class="card-image">
          <img src="${sanPham.hinhAnh}" alt="${sanPham.ten}">
          <span class="badge">${sanPham.khuVuc}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${sanPham.ten}</h3>
          <p class="card-desc">${sanPham.moTa}</p>
          <div class="card-footer">
            <span class="card-price">${giaTien}</span>
            <button class="btn-detail" onclick="xemChiTiet(${sanPham.id})">Đặt dịch vụ</button>
          </div>
        </div>
      </div>
    `;
  });

  // Đổ toàn bộ chuỗi HTML vừa tạo vào khung chứa
  container.innerHTML = chuoiHTML;
}

// 3. HÀM LỌC SẢN PHẨM THEO KHU VỰC
function locSanPham(khuVucChon, nutBam) {
  // Đổi trạng thái active cho nút được bấm
  const tatCaNut = document.querySelectorAll(".filter-btn");
  tatCaNut.forEach((btn) => btn.classList.remove("active"));
  if (nutBam) {
    nutBam.classList.add("active");
  }

  // Lọc mảng dữ liệu và gọi lại hàm hiển thị
  if (khuVucChon === "Tất cả") {
    hienThiDanhSach(danhSachDichVu, "product-list");
  } else {
    const danhSachDaLoc = danhSachDichVu.filter(
      (sp) => sp.khuVuc === khuVucChon
    );
    hienThiDanhSach(danhSachDaLoc, "product-list");
  }
}

// 4. HÀM XỬ LÝ KHI BẤM NÚT TRÊN TỪNG SẢN PHẨM
function xemChiTiet(idSanPham) {
  const sanPham = danhSachDichVu.find((sp) => sp.id === idSanPham);
  if (sanPham) {
    alert(
      `THÔNG TIN DỊCH VỤ:\n` +
      `- Tên: ${sanPham.ten}\n` +
      `- Khu vực: ${sanPham.khuVuc}\n` +
      `- Giá: ${sanPham.gia.toLocaleString("vi-VN")} VNĐ\n` +
      `- Mô tả: ${sanPham.moTa}`
    );
  }
}

// 5. TỰ ĐỘNG CHẠY HÀM HIỂN THỊ KHI TRANG WEB TẢI XONG
document.addEventListener("DOMContentLoaded", () => {
  hienThiDanhSach(danhSachDichVu, "product-list");
});
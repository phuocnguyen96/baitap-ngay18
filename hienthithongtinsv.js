var maSV = callelements("#nhap-ma-sv")
var tenSV = callelements("#nhap-ten-sv")
var loaiSv = callelements("#loai-sv")
var svNgheo = callelements(".option-1")
var svBinhThuong = callelements(".option-2")
var svQuocTe = callelements(".option-3")
var diemToan = callelements("#nhap-diemtoan")
var diemVan = callelements("#nhap-diemvan")
var btnSubmit = callelements("#nutbutton")
var hienthiMaSv = callelements(".hienthimasv")
var hienthiTenSv = callelements(".hienthitensv")
var hienthiloaiSv = callelements(".hienthiloaisv")
var hienthiDiemtbSv = callelements(".hienthidiemtb")
var hienthiXepLoai = callelements(".hienthixeploai")
var thanhBarProcess = callelements("#thanhbar")
var diemtb;

btnSubmit.addEventListener("click", hienthithongtin)

function callelements(elements){
    var domElements = document.querySelector(elements)
    return domElements
}

function kiemtra(macuasv,tencuasv,diemtoancuasv,diemvancuasv) {
    var ketQuaReturn;
    if(!macuasv || !tencuasv || !diemtoancuasv || !diemvancuasv){
        ketQuaReturn = false;
    } else {
        ketQuaReturn = true
    }
    return ketQuaReturn;
}

function tinhdiemtrungbinh(diemtoanne,diemvanne){
    var diemtbmon;

    diemtbmon = (diemtoanne + diemvanne)/2
    return diemtbmon;
}

function loaisinhvien(){
    var soSanhSvTh1 = svNgheo.value;
    var soSanhSvTh2 = svBinhThuong.value;
    var inputLoaiSv = loaiSv.value;
    var svLoai;
    
    if(soSanhSvTh1 == inputLoaiSv){
        svLoai = "Sinh viên nghèo"
    } else if(soSanhSvTh2 == inputLoaiSv){
        svLoai = "Sinh viên hệ đào tạo phổ thông"
    } else {
        svLoai = "sinh viên hệ đào tạo Quốc Tế"
    }
    
    return svLoai;
}

function xeploaisv(tbmon){
    var xepLoaiSv;

    if(tbmon >= 8.5){
        xepLoaiSv = "Học sinh Giỏi"
    } else if(tbmon < 8.5 && tbmon >=6){
        xepLoaiSv = "Học sinh Khá"
    } else{
        xepLoaiSv = "Học sinh Trung bình"
    }
    event. preventDefault();
    return xepLoaiSv;
}

function hienthithongtin() {
    var diemToanNe = Number(diemToan.value)
    var diemVanNe = Number(diemVan.value)
    var thoaDieuKien = kiemtra(maSV.value,tenSV.value,diemToanNe,diemVanNe)
    var loaiSv1 = loaiSv.value
    var LoaiSVne = loaisinhvien(loaiSv1)
    var ketquaTB = tinhdiemtrungbinh(diemToanNe,diemVanNe)
    var xepLoaiCuaSv = xeploaisv(ketquaTB)
    var tinhValueAria = ketquaTB*10;

    thanhBarProcess.ariaValueNow = tinhValueAria;
    thanhBarProcess.style.width = formatAsPercentage(tinhValueAria);

    var sinhVien = {
        maSv: '',
        tenSv: '',
        loaiSv: '',
        diemTB: '',
        xepLoai: '',
    }

    sinhVien.maSv = maSV.value;
    sinhVien.tenSv = tenSV.value;
    sinhVien.loaiSv = LoaiSVne;
    sinhVien.diemTB = ketquaTB;
    sinhVien.xepLoai = xepLoaiCuaSv;

    if(thoaDieuKien){
        hienthiMaSv.textContent =" " + sinhVien.maSv;
        hienthiTenSv.textContent =" " + sinhVien.tenSv;
        hienthiloaiSv.textContent =" " +  sinhVien.loaiSv;
        hienthiDiemtbSv.textContent =" " +  sinhVien.diemTB;
        hienthiXepLoai.textContent =" " +  sinhVien.xepLoai;
    } else {
        alert("Vui lòng kiểm tra lại đầy đủ thông tin")
    }

    if(ketquaTB >= 8.5){
        thanhBarProcess.textContent = " Rất tốt"
        thanhBarProcess.classList.add("bg-success")
        thanhBarProcess.classList.remove("bg-info")
        thanhBarProcess.classList.remove("bg-warning")
    } else if(ketquaTB < 8.5 && ketquaTB >= 6){
        thanhBarProcess.textContent = "Bạn cần nổ lực thêm chút nữa"
        thanhBarProcess.classList.add("bg-info")
        thanhBarProcess.classList.remove("bg-success")
        thanhBarProcess.classList.remove("bg-warning")
    } else {
        thanhBarProcess.textContent = "Thật thất vọng"
        thanhBarProcess.classList.add("bg-warning")
        thanhBarProcess.classList.remove("bg-info")
        thanhBarProcess.classList.remove("bg-success")
    }

    event. preventDefault();

}

function formatAsPercentage(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  }


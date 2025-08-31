let cropper;
const uploadInput = document.getElementById("upload");
const cropperWrapper = document.querySelector(".cropper-wrapper");
const cropperImg = document.getElementById("cropper-img");
const userImg = document.getElementById("user-img");

// chọn ảnh -> mở cropper
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    cropperImg.src = e.target.result;
    cropperWrapper.style.display = "block";
    if (cropper) cropper.destroy();
    cropper = new Cropper(cropperImg, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
    });
  };
  reader.readAsDataURL(file);
}

// áp dụng crop -> chèn vào avatar
function applyCrop() {
  if (!cropper) return;
  const canvas = cropper.getCroppedCanvas({
    width: 320,
    height: 320,
  });
  userImg.src = canvas.toDataURL("image/png");
  cropperWrapper.style.display = "none";
  cropper.destroy();
  cropper = null;
}

// update họ tên + đơn vị
function updateInfo() {
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const infoBox = document.getElementById("text-info");
  infoBox.innerText = `${name}\n${role}`;
}

// update lời tri ân
function updateMessage() {
  const msg = document.getElementById("msg").value;
  const msgBox = document.getElementById("text-msg");
  msgBox.innerText = msg;
}

// tải ảnh về
function downloadImage() {
  const preview = document.querySelector(".preview");
  html2canvas(preview, { 
    scale: 2,
    useCORS: true   // cho phép load ảnh cross-origin
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "TriAn_20-11.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}


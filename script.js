// =================================================================================
// 1. AMBIL ELEMEN DARI HTML
// =================================================================================
const screenCamera=document.getElementById('screen-camera');
const screenEditor=document.getElementById('screen-editor');
const screenFinish=document.getElementById('screen-finish');

const video=document.getElementById('webcam');
const btnCapture=document.getElementById('btn-captute');

const canvas=document.getElementById('photo-canvas');
const ctx=canvas.getContext('2d');
const btnEditorDone=document.getElementById('btn-editor-done');

// Butang pilihan editor
const filterButtons=document.querySelectorAll('.filter-item');
const stickerButtons=document.querySelectorAll('.sticker-item');
const frameButtons=document.querySelectorAll('.frame-item');
const tabSPans=document.querySelectorAll('.tab-menu span');

// Kumpulan Panel Pilihan 
const btnSavePng=document.getElementById('btn-save-png');
const btnSaveJpeg=document.getElementById('btn-save-jpeg');
const btnSubmitEmail=document.getElementById('btn-submit-email');
const emailInput=document.getElementById('emailInput');

// ================================================================================== 
// 2. PEMBOLEHUBAH SIMPAN DATA GAMBAR 
// ================================================================================== 
let capturedImage=null; // simpan gambar asal yang ditangkap 
let currentFilter='none';
let currentSticker='';
let currentFrame='none';

// ================================================================================== 
// 3. HIDUPKAN CAMERA WEBCAM 
// ================================================================================== 
async function startCamera() {
	try {
		const stream=await navigator.mediaDevices.getUserMedia({
			vide: { facingMode: "user" },
			audio: false
		});
		video.srcObject=stream;
	} catch (error) {
		console.error ("Failed to open camera", error);
		alert ("Please allow camera access in your browser to use the photobooth.");
	}
}

// Jalankan camera sebaik sahaja website dibuka 
startCamera ();

// ================================================================================== 
// 4. FUNGSI TANGKAP GAMBAR 
// ================================================================================== 
btCapture.addEventListener('click', () => {
	// Tetapkan size canvas ikut resolusi sebenar camera 
	canvas.width=video.videoWidth || 640;
	canvas.height=video.videoHeight || 480;

	// Lukis video ke dalam canvas secara terbalik (mirror mode) 
	ctx.save();
	ctx.translate(canvas.width, 0);
	ctx.scale(-1,1);
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	ctx.restore();

	// Simpan salinan gambar asal so boleh tukar filter/sticker
	capturedImage=new Image();
	capturedImage.src=canvas.toDataURL('image/png');
	
	// Tukar dari Screen 1 ke Screen 2
	screenCamera.classList.add('hide');
	screenEditor.classList.remove('hide');
});


// ================================================================================== 
// 5. FUNGSI LUKIS SEMULA EDITOR (FILTER, STICKER, FRAME)
// ================================================================================== 
function renderCanvas() {
	if (!capturedImage) return;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();

	// 1. Guna filter
	if (currentFilter==='B&W') {
		ctx.filter='grayscale(100%) contarst(110%)';
	} else if (currentFilter==='Vintage') {
		ctx.filter='sepia(65%) contarst(95%) brightness(105%)';
	} else if (currentFilter==='K-Style') {
		ctx.filter='brightness(112%) contrast(92%) saturate(115%)';
	} else {
		ctx.filter='none';
	}

	// Lukis semula gambar asal dengan filter yang dipilih
	ctx.drawImage(capturedImage, 0, 0, canvas.width, canvas.height);
	ctx.filter='none'; //reset filter so x kena kat frame and sticker

	// 2. Guna frame
	if (currentFrame==='Classic') {
		ctx.strokeStyle='#ffffff';
		ctx.lineWidth=30;
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
	} else if (currentFrame==='Retro') {
		ctx.strokeStyle='#f3ebd1';



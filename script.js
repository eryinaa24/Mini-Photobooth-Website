<-- ================================================================================== -->
<-- 1. AMBIL ELEMEN DARI HTML -->
<-- ================================================================================== -->
const screenCamera=document.getElementById('screen-camera');
const screenEditor=document.getElementById('screen-editor');
const screenFinish=document.getElementById('screen-finish');

const video=document.getElementById('webcam');
const btnCapture=document.getElementById('btn-captute');

const canvas=document.getElementById('photo-canvas');
const ctx=canvas.getContext('2d');
const btnEditorDone=document.getElementById('btn-editor-done');

<-- Butang pilihan editor -->
const filterButtons=document.querySelectorAll('.filter-item');
const stickerButtons=document.querySelectorAll('.sticker-item');
const frameButtons=document.querySelectorAll('.frame-item');
const tabSPans=document.querySelectorAll('.tab-menu span');

<--Kumpulan Panel Pilihan -->
const btnSavePng=document.getElementById('btn-save-png');
const btnSaveJpeg=document.getElementById('btn-save-jpeg');
const btnSubmitEmail=document.getElementById('btn-submit-email');
const emailInput=document.getElementById('emailInput');

<-- ================================================================================== -->
<-- 2. PEMBOLEHUBAH SIMPAN DATA GAMBAR -->
<-- ================================================================================== -->
let capturedImage=null; <-- simpan gambar asal yang ditangkap -->
let currentFilter='none';
let currentSticker='';
let currentFrame='none';

<-- ================================================================================== -->
<-- 3. HIDUPKAN CAMERA WEBCAM -->
<-- ================================================================================== -->
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

<--Jalankan camera sebaik sahaja website dibuka -->
startCamera ();

<-- ================================================================================== -->
<-- 4. 	FUNGSI TANGKAP GAMBAR -->
<-- ================================================================================== -->
btCapture.addEventListener('click', () => {
	<-- Tetapkan size canvas ikut resolusi sebenar camera -->
	canvas.width=video.videoWidth || 640;
	canvas.height=video.videoHeight || 480;

	<-- Lukis video ke dalam canvas secara terbalik (mirror mode) -->
	ctx.save();



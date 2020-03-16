/* header toggle btn controller */
const header_btn = document.querySelector('.header_btn');
const header_center = document.querySelector('.header_center');
const header_right = document.querySelector('.header_right');
header_btn.addEventListener('click',()=>{
	header_center.classList.toggle('active');
	header_right.classList.toggle('active');
})
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    

    // 顯示當前幻燈片
    function showSlide(n) {
        // 重置所有幻燈片和圓點的活動狀態
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 設置當前幻燈片和圓點的活動狀態
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 下一張幻燈片
    window.nextSlide = function() {
        showSlide(currentSlide + 1);

    // 上一張幻燈片
    window.prevSlide = function() {
        showSlide(currentSlide - 1);
    }

    // 設置點擊事件
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // 點擊導航點跳轉到相應幻燈片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // 自動輪播
    let slideInterval = setInterval(nextSlide, 5000); // 每5秒切換一次

    // 滑鼠移入暫停，移出繼續
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // 初始顯示第一張幻燈片
    showSlide(0);
});
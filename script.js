document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.slider-container');
    let currentSlide = 0;
    let slideInterval;

    // 檢查必要元素是否存在
    if (slides.length === 0) {
        console.warn('找不到幻燈片元素');
        return;
    }

    // 顯示當前幻燈片
    function showSlide(n) {
        // 重置所有幻燈片和圓點的活動狀態
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 設置當前幻燈片和圓點的活動狀態
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');

        // 確認圓點存在再設置活動狀態
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    // 下一張幻燈片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 上一張幻燈片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 自動輪播控制
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // 設置事件監聽器 (如果元素存在)
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // 點擊導航點跳轉到相應幻燈片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // 滑鼠移入暫停，移出繼續
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        // 添加觸摸設備支援
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });

        sliderContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                // 向左滑動，顯示下一張
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                // 向右滑動，顯示上一張
                prevSlide();
            }
            startAutoSlide();
        });
    }

    // 初始顯示第一張幻燈片
    showSlide(0);

    // 開始自動輪播
    startAutoSlide();
});
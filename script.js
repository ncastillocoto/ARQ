
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        function initSlideshow() {
            updateSlideIndicator();
            updateNavigation();
            updateProgressBar();
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = n;
            
            if (currentSlide >= totalSlides) currentSlide = 0;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            
            slides[currentSlide].classList.add('active');
            updateNavigation();
            updateSlideIndicator();
            updateProgressBar();
            
            const continueBtn = document.querySelector('.continue-btn');
            if (currentSlide === totalSlides - 1) {
                continueBtn.style.display = 'block';
            } else {
                continueBtn.style.display = 'none';
            }
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        function updateNavigation() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }

        function updateSlideIndicator() {
            const indicator = document.getElementById('slideIndicator');
            indicator.innerHTML = '';
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === currentSlide) dot.classList.add('active');
                dot.onclick = () => showSlide(i);
                indicator.appendChild(dot);
            }
        }
        function updateProgressBar() {
            const progress = document.getElementById('progressBar');
            const percentage = ((currentSlide + 1) / totalSlides) * 100;
            progress.style.width = percentage + '%';
        }
        function startTest() {
            const testUrl = 'https://olimpiada.progrentis.com/';
            
            if (confirm('¿Estás seguro de que quieres iniciar la Gran Final Nacional? Una vez que comiences, no podrás volver a estas instrucciones.')) {
                window.location.href = testUrl;
            }
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
            if (e.key === 'Enter' && currentSlide === totalSlides - 1) startTest();
        });
        initSlideshow();
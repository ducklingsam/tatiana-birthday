document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".section");
    let currentSection = 0;
    let startY;

    function updateSections() {
        sections.forEach((section, index) => {
            if (index === currentSection) {
                section.classList.add("active");
                section.style.transform = `translateY(0)`;
                section.style.opacity = 1; // Устанавливаем opacity 1 для текущей секции
            } else if (index < currentSection) {
                section.classList.remove("active");
                section.style.transform = `translateY(-100vh)`;
                section.style.opacity = 0; // Устанавливаем opacity 0 для предыдущих секций
            } else {
                section.classList.remove("active");
                section.style.transform = `translateY(100vh)`;
                section.style.opacity = 0; // Устанавливаем opacity 0 для следующих секций
            }
        });
    }

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[currentSection].style.opacity = 0; // Уменьшаем opacity сразу
            currentSection = index;
            updateSections();
        }
    }

    updateSections();

    window.addEventListener("wheel", function (event) {
        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) {
                sections[currentSection].style.opacity = 0; // Уменьшаем opacity сразу
                currentSection++;
                updateSections();
            }
        } else {
            if (currentSection > 0) {
                sections[currentSection].style.opacity = 0; // Уменьшаем opacity сразу
                currentSection--;
                updateSections();
            }
        }
    });

    // Обработка сенсорных событий
    window.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    });

    window.addEventListener("touchmove", function (event) {
        if (!startY) return;
        let currentY = event.touches[0].clientY;
        let deltaY = startY - currentY;

        if (deltaY > 20) { // Скролл вверх
            if (currentSection < sections.length - 1) {
                sections[currentSection].style.opacity = 0; // Уменьшаем opacity сразу
                currentSection++;
                updateSections();
            }
        } else if (deltaY < -20) { // Скролл вниз
            if (currentSection > 0) {
                sections[currentSection].style.opacity = 0; // Уменьшаем opacity сразу
                currentSection--;
                updateSections();
            }
        }
        startY = null; // Сбрасываем значение
    });

    window.scrollToSection = scrollToSection;
});

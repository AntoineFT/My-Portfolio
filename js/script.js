let currentPage = 0;

const cover = document.querySelector('.cover');
const pages = document.querySelectorAll('.page');
const coverContent = document.querySelector('.cover-content');

cover.addEventListener('click', openBook);
pages.forEach(page => {
    page.addEventListener('click', handlePageClick);
});

function openBook() {
    if (currentPage === 0) {
        // Animation d’ouverture avec courbure
        gsap.to(cover, {
            rotationY: -180,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                const progress = gsap.getProperty(cover, "rotationY") / -180;
                cover.style.transform = `rotateY(${gsap.getProperty(cover, "rotationY")}deg) scaleY(${1 + progress * 0.1})`; // Courbure
            },
            onComplete: () => {
                coverContent.style.opacity = 0;
                cover.style.zIndex = 0;
                showPage(1);
            }
        });
    }
}

function handlePageClick(e) {
    const pageNum = parseInt(this.dataset.page);
    const clickX = e.clientX - this.getBoundingClientRect().left;

    // Clic à droite : tourner la page suivante
    if (clickX > this.offsetWidth / 2 && currentPage < pages.length) {
        turnPageForward(pageNum);
    }
    // Clic à gauche : refermer ou revenir
    else if (clickX <= this.offsetWidth / 2 && currentPage > 0) {
        turnPageBack(pageNum);
    }
}

function turnPageForward(pageNum) {
    if (pageNum === currentPage) {
        gsap.to(pages[pageNum - 1], {
            rotationY: -180,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                const progress = gsap.getProperty(pages[pageNum - 1], "rotationY") / -180;
                pages[pageNum - 1].style.transform = `rotateY(${gsap.getProperty(pages[pageNum - 1], "rotationY")}deg) scaleY(${1 + progress * 0.1})`;
            },
            onComplete: () => {
                pages[pageNum - 1].style.zIndex = 5 - pageNum;
                showPage(pageNum + 1);
            }
        });
    }
}

function turnPageBack(pageNum) {
    if (pageNum === currentPage) {
        if (pageNum === 1) {
            // Refermer le livre
            gsap.to(cover, {
                rotationY: 0,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    const progress = 1 - gsap.getProperty(cover, "rotationY") / -180;
                    cover.style.transform = `rotateY(${gsap.getProperty(cover, "rotationY")}deg) scaleY(${1 + progress * 0.1})`;
                },
                onComplete: () => {
                    coverContent.style.opacity = 1;
                    cover.style.zIndex = 10;
                    hidePage(1);
                }
            });
        } else {
            // Revenir à la page précédente
            gsap.to(pages[pageNum - 2], {
                rotationY: 0,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    const progress = 1 - gsap.getProperty(pages[pageNum - 2], "rotationY") / -180;
                    pages[pageNum - 2].style.transform = `rotateY(${gsap.getProperty(pages[pageNum - 2], "rotationY")}deg) scaleY(${1 + progress * 0.1})`;
                },
                onComplete: () => {
                    pages[pageNum - 2].style.zIndex = 6;
                    showPage(pageNum - 1);
                }
            });
        }
    }
}

function showPage(pageNum) {
    currentPage = pageNum;
    pages.forEach((page, index) => {
        const content = page.querySelector('.page-content');
        if (index + 1 === pageNum) {
            gsap.to(content, { opacity: 1, duration: 0.5 });
        } else {
            content.style.opacity = 0;
        }
    });
}

function hidePage(pageNum) {
    currentPage = 0;
    pages.forEach(page => {
        page.querySelector('.page-content').style.opacity = 0;
    });
}

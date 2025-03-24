document.querySelector('.cover').addEventListener('click', openBook);

function openBook() {
    const cover = document.querySelector('.cover');
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    const coverContent = document.querySelector('.cover-content');
    const pageContents = document.querySelectorAll('.page-content');

    // Animation de la couverture
    gsap.to(cover, {
        rotationY: -180,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
            coverContent.style.opacity = 0; // Cache le contenu de la couverture
            cover.style.zIndex = 0; // Passe la couverture derrière
        }
    });

    // Animation de la page gauche
    gsap.to(leftPage, {
        rotationY: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
        onStart: () => {
            leftPage.style.zIndex = 2; // Page devant
        }
    });

    // Animation de la page droite (reste fixe mais contenu apparaît)
    gsap.to(rightPage, {
        duration: 0.5,
        delay: 1.5,
        onStart: () => {
            rightPage.style.zIndex = 2;
        }
    });

    // Affichage progressif du contenu des pages
    gsap.to(pageContents, {
        opacity: 1,
        duration: 0.5,
        delay: 2,
        stagger: 0.2 // Légère décalage entre les deux pages
    });

    // Ajout des classes pour gérer l’état
    cover.classList.add('open');
    leftPage.classList.add('open');
}

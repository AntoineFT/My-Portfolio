function openBook() {
    const book = document.querySelector('.book');
    const front = document.querySelector('.front');
    const pages = document.querySelectorAll('.page');

    // Animation de zoom initial
    gsap.to(book, {
        scale: 1.5,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            // Ouverture du livre
            gsap.to(book, {
                rotationY: -180,
                duration: 1.5,
                ease: "power2.out",
                onStart: () => {
                    front.style.zIndex = 1; // Passe la couverture derrière
                    pages.forEach(page => page.style.display = 'block'); // Affiche les pages
                }
            });
            gsap.to(book, { scale: 1, duration: 1, delay: 0.5 });
        }
    });
}

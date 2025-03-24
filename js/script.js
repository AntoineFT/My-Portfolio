function openBook() {
    const cover = document.querySelector('.cover');
    const inside = document.querySelector('.inside');
    gsap.to(cover, { rotationY: -180, duration: 1, ease: "power2.inOut" });
    setTimeout(() => {
        cover.classList.add('open');
        inside.classList.add('visible');
    }, 500);
}
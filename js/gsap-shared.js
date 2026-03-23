import { ANIMATION_CONFIG } from "./animationConfig.js";

export const DEFAULT_SCROLL_TRIGGER = {
    start: "top 50%",
    toggleActions: ANIMATION_CONFIG.defaultToggleActions
};

export function initLoadIn() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({ onComplete: resolve });
        tl.to("main", {
            opacity: 1,
            ease: ANIMATION_CONFIG.pageTransitionEase,
            duration: ANIMATION_CONFIG.fadeDuration,
        })
        .to(".svgBG", {
            opacity: 1,
            ease: ANIMATION_CONFIG.pageTransitionEase,
            duration: ANIMATION_CONFIG.fadeDuration,
        })
    });
}

export function initParallaxScroll() {
    const maxShift = 150;
    const svgBG = document.querySelector('.svgBG');
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const shift = Math.min(scroll * 0.05, maxShift);
  
      svgBG.style.transform = `translateY(-${shift}px)`;
    });
}

export function animatePageTransition() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({ onComplete: resolve });
        tl.to("main", {
            opacity: 0,
            ease: ANIMATION_CONFIG.pageTransitionEase,
            duration: ANIMATION_CONFIG.fadeDuration,
        });
    });
}

export function initInternalLinks() {
    document.querySelectorAll('[data-linkType="internal"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.getAttribute("href");
            animatePageTransition().then(() => window.location.href = href);
        });
    });
}
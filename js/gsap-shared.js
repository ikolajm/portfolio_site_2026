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

export function initContactAnimation() {
    const bumper = document.querySelector(".svg-location-bumper");
    const maskBorder = document.querySelector("#contact .location-column .row .svg-location-border");
    const container = document.querySelector("#contact .location-column .row .container");
    const content = container.querySelector(":scope > .location");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: bumper,
            start: "top 70%",
            toggleActions: ANIMATION_CONFIG.defaultToggleActions
        }
    });

    tl.to(bumper, { delay: ANIMATION_CONFIG.defaultDelay, duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1 })
      .to(container, { duration: ANIMATION_CONFIG.expandDuration, maxWidth: "160px" }, "<")
      .to(maskBorder, { duration: ANIMATION_CONFIG.expandDuration, maxWidth: "100%", opacity: 1 }, "<")
      .to(content, { duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1 });
}

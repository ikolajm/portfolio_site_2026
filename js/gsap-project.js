import { ANIMATION_CONFIG } from "./animationConfig.js";
import { DEFAULT_SCROLL_TRIGGER, initLoadIn, initParallaxScroll, initInternalLinks } from "./gsap-shared.js";
import { initBackground } from "./svgBG.js";

function initDetailsAnimation() {
    const section = document.querySelector("#details");
    const metadata = document.querySelector("#details .metadata");
    const description = document.querySelector("#details .description");

    const tweenDefaults = {
        duration: ANIMATION_CONFIG.fadeDuration,
        ease: "power4.out",
        x: 0,
        opacity: 1,
    };

    const scrollTriggerBase = {
        start: "top 65%",
        toggleActions: ANIMATION_CONFIG.defaultToggleActions,
    };
    const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, ...scrollTriggerBase }
    });

    timeline
        .to(metadata, { ...tweenDefaults })
        .to(description, { ...tweenDefaults });
}

function initCardAnimation() {
    const spread = document.querySelector("#selected-mockups .card-spread");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: spread,
            ...DEFAULT_SCROLL_TRIGGER
        }
    });
    tl.to(spread, { duration: ANIMATION_CONFIG.fadeDuration, opacity: 1 });
}

function initFigmaAnimation() {
    const figmaEmbed = document.querySelector("#figma .file-preview");
    gsap.to(figmaEmbed, {
        duration: ANIMATION_CONFIG.fadeDurationLong,
        opacity: 1,
        scrollTrigger: {
            trigger: figmaEmbed,
            start: "top 65%",
            toggleActions: ANIMATION_CONFIG.defaultToggleActions
        }
    });
}

gsap.registerPlugin(ScrollTrigger);
window.onload = () => {
    const bg = initBackground(document.querySelector('.svgBG'));
    bg.initScrollTriggers(ScrollTrigger);
    initLoadIn();
    initInternalLinks();
    initDetailsAnimation();
    initCardAnimation();
    initFigmaAnimation();
    initParallaxScroll();
};
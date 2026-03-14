import { ANIMATION_CONFIG } from "./animationConfig.js";
import { DEFAULT_SCROLL_TRIGGER, initLoadIn, initParallaxScroll, initInternalLinks, initContactAnimation } from "./gsap-shared.js";
import { initBackground } from "./svgBG.js";

function initDetailsAnimation() {
    const section = document.querySelector("#details");
    const metadata = document.querySelector("#details .metadata");
    const description = document.querySelector("#details .description");

    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 550px)",
        isRow: "(min-width: 551px)"
    }, (context) => {
        const { isRow } = context.conditions;

        const tweenDefaults = {
            duration: ANIMATION_CONFIG.fadeDurationLong,
            ease: "power4.out",
            x: 0,
            opacity: 1,
        };

        const scrollTriggerBase = {
            start: "top 65%",
            toggleActions: ANIMATION_CONFIG.defaultToggleActions,
        };

        if (isRow) {
            const timeline = gsap.timeline({
                scrollTrigger: { trigger: section, ...scrollTriggerBase }
            });

            timeline
                .to(metadata, { ...tweenDefaults })
                .to(description, { ...tweenDefaults }, "-=0.4");

        } else {
            gsap.to(metadata, {
                ...tweenDefaults,
                scrollTrigger: { trigger: metadata, ...scrollTriggerBase }
            });
            gsap.to(description, {
                ...tweenDefaults,
                scrollTrigger: { trigger: description, ...scrollTriggerBase }
            });
        }
    });
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
    initLoadIn();
    initInternalLinks();
    initDetailsAnimation();
    initCardAnimation();
    initFigmaAnimation();
    initContactAnimation();
    const bg = initBackground(document.querySelector('.svgBG'));
    initParallaxScroll();
    bg.initScrollTriggers(ScrollTrigger);
};
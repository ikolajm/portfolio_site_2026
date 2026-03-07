import { ANIMATION_CONFIG } from "./animationConfig.js";
import { DEFAULT_SCROLL_TRIGGER, initLoadIn, initInternalLinks, initContactAnimation } from "./gsap-shared.js";

function initHeroAnimation() {
    const homeContent = document.querySelector("#home .content");
    const text = homeContent.querySelector(":scope > .text");
    const ease = ANIMATION_CONFIG.defaultEase;
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;
        
        gsap.to(text, {
            delay: 2.5, // Delay to match reveal of .home__content bg
            duration: ANIMATION_CONFIG.fadeDuration,
            opacity: 1
        });
        const tl = gsap.timeline();
        tl.to(homeContent, {
            delay: .75,
            duration: ANIMATION_CONFIG.fadeDuration,
            opacity: 1
        });
        tl.to(homeContent, {
            duration: ANIMATION_CONFIG.flickerDuration,
            opacity: 0
        });
        tl.to(homeContent, {
            duration: ANIMATION_CONFIG.flickerDuration,
            opacity: 1
        });
        tl.to(homeContent, {
            duration: ANIMATION_CONFIG.flickerDuration,
            opacity: 0
        });
        tl.to(homeContent, {
            duration: ANIMATION_CONFIG.flickerDuration,
            opacity: 1
        });
        tl.to(homeContent, {
            delay: ANIMATION_CONFIG.defaultDelay,
            duration: ANIMATION_CONFIG.rotateDuration,
            ease,
            rotation: 0
        });
        tl.to(homeContent, {
            duration: ANIMATION_CONFIG.fadeDurationLong,
            ease,
            paddingTop: isRow ? 16 : 24,
            paddingBottom: isRow ? 16 : 24,
            paddingLeft: 24,
            paddingRight: 24,
            width: isRow ? 350 : 292,
            height: isRow ? 140 : 164,
            background: "rgba(20, 21, 21, .75)"
        });
    });  
}

// Media containers are visually heavier — fade in at fadeDurationLong (.6).
// SVGs, text, controls use fadeDuration (.3).
// expandProp: the CSS property to animate to "100%" (e.g. "width", "maxWidth")
function addMediaReveal(tl, mediaEl, expandEl, expandProp) {
    return tl
        .to(mediaEl, { duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1 })
        .to(expandEl, { duration: ANIMATION_CONFIG.expandDuration, [expandProp]: "100%" }, "<");
}

function initAboutAnimation() {
    const mediaContainer = document.querySelector("#about .content .media");
    const videoContainer = document.querySelector("#about .content .media .video");
    const textElement = document.querySelector("#about .content .text");

    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 999px)",
        isRow: "(min-width: 999px)"
    }, (context) => {
        const { isRow } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textElement,
                ...DEFAULT_SCROLL_TRIGGER
            }
        });

        if (isRow) {
            addMediaReveal(tl, mediaContainer, videoContainer, "width")
                .to(textElement, {
                    delay: ANIMATION_CONFIG.defaultDelay,
                    duration: ANIMATION_CONFIG.fadeDurationLong,
                    opacity: 1,
                });
        } else {
            tl.to(textElement, { duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1, x: "0px" });
            addMediaReveal(tl, mediaContainer, videoContainer, "width");
        }
        

        return () => tl.kill();
    });
}

function pinParticleLogos() {
    const articlesContainer = document.querySelector("#experience .content");
    const particleColumn = document.querySelector(".particle-column");

    const logo = document.querySelector("#particle-logo");
    const LOGO_HEIGHT = 275;
    const ENTRY_RANGE = 0.3;
    const EXIT_RANGE = 0.3;

    const nav = document.querySelector("nav");
    const navHeight = nav ? nav.offsetHeight : 0;
    const topBuffer = document.querySelector(".article-column .noise-trigger:first-of-type");
    const bottomBuffer = document.querySelector(".article-column .noise-trigger:last-of-type");
    const topBufferHeight = topBuffer ? topBuffer.offsetHeight : 0;
    const bottomBufferHeight = bottomBuffer ? bottomBuffer.offsetHeight : 0;
    const vh = window.innerHeight;
    const availableVh = vh - navHeight;

    const TOP_OFFSET = -(availableVh / 2 - LOGO_HEIGHT / 2 - topBufferHeight);
    const BOTTOM_OFFSET = availableVh / 2 - LOGO_HEIGHT / 2 - bottomBufferHeight;

    gsap.set(logo, { y: TOP_OFFSET }); // Initial state for no jump on gsap

    ScrollTrigger.create({
        trigger: articlesContainer,
        start: "top top",
        end: "bottom bottom",
        pin: particleColumn,
        pinSpacing: false,
        scrub: true, // smooth, scroll-driven
        onUpdate: self => {
            const progress = self.progress; // 0 → 1
            let y;
        
            // ENTRY
            if (progress <= ENTRY_RANGE) {
                const p = progress / ENTRY_RANGE; // normalized 0 → 1
                y = gsap.utils.interpolate(TOP_OFFSET, 0, p);
            }
            // EXIT
            else if (progress >= 1 - EXIT_RANGE) {
                const p = (progress - (1 - EXIT_RANGE)) / EXIT_RANGE; // normalized 0 → 1
                y = gsap.utils.interpolate(0, BOTTOM_OFFSET, p);
            }
            // CENTER
            else {
                y = 0;
            }
        
            gsap.set(logo, { y });
        }
    });
}

function initExperienceArticleAnimations() {
    const experienceArticles = document.querySelectorAll("#experience article");

    experienceArticles.forEach(article => {
        gsap.to(article, {
            duration: ANIMATION_CONFIG.fadeDurationLong,
            x: "0px",
            opacity: 1,
            scrollTrigger: {
                trigger: article,
                ...DEFAULT_SCROLL_TRIGGER
            }
        });
    });
}

function initProjectFeature() {
    const mediaElement = document.querySelector("#projects .media");
    const imageElement = mediaElement.querySelector(":scope .image");
    const controlsElement = mediaElement.querySelector(":scope .controls");
    const contentElement = document.querySelector("#projects .project .content");

    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contentElement,
                ...DEFAULT_SCROLL_TRIGGER
            }
        });

        if (isRow) {
            addMediaReveal(tl, mediaElement, imageElement, "maxWidth")
                .to(contentElement, {
                    delay: ANIMATION_CONFIG.defaultDelay,
                    duration: ANIMATION_CONFIG.fadeDurationLong,
                    opacity: 1,
                    x: "0px"
                })
                .to(controlsElement, { duration: ANIMATION_CONFIG.fadeDuration, opacity: 1 });
        } else {
            tl.to(contentElement, { duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1, x: "0px" });
            addMediaReveal(tl, mediaElement, imageElement, "maxWidth")
                .to(controlsElement, { duration: ANIMATION_CONFIG.fadeDuration, opacity: 1 });
        }
        

        return () => tl.kill();
    });
}

gsap.registerPlugin(ScrollTrigger);
window.onload = () => {
    initLoadIn();
    initHeroAnimation();
    initAboutAnimation();
    pinParticleLogos();
    initExperienceArticleAnimations();
    initProjectFeature();
    initInternalLinks();
    initContactAnimation();
}
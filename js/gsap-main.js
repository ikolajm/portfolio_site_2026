import { ANIMATION_CONFIG } from "./animationConfig.js";

function initLoadIn() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: resolve
        })
        tl.to(
            "main",
            {
                opacity: 1,
                ease: "power1.out",
                duration: .3,
            }
        )
    });
}

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

        const scrollTriggerOptions = {
            ease: ANIMATION_CONFIG.defaultEase,
            start: "top 50%",
            toggleActions: ANIMATION_CONFIG.defaultToggleActions
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textElement,
                ...scrollTriggerOptions
            }
        });

        isRow ? tl.to(mediaContainer, { 
                duration: ANIMATION_CONFIG.fadeDurationLong, 
                opacity: 1 
            })
            .to(videoContainer, { 
                duration: ANIMATION_CONFIG.expandDuration, 
                width: "100%" 
            }, "<")
            .to(textElement, {
                delay: ANIMATION_CONFIG.defaultDelay,
                duration: ANIMATION_CONFIG.fadeDurationLong, 
                opacity: 1, 
            })
        : tl.to(textElement, { 
            delay: 0, 
            duration: ANIMATION_CONFIG.fadeDurationLong, 
            opacity: 1, 
            x: "0px" 
        })
        .to(mediaContainer, { 
            duration: ANIMATION_CONFIG.fadeDurationLong, 
            opacity: 1 
        })
        .to(videoContainer, { 
            duration: ANIMATION_CONFIG.expandDuration, 
            width: "100%" 
        }, "<")
        

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

    const nav = document.querySelector("nav"); // adjust selector to match yours
    const navHeight = nav ? nav.offsetHeight : 0;
    const topBuffer = document.querySelector(".article-column .noise-trigger:first-of-type");
    const bottomBuffer = document.querySelector(".article-column .noise-trigger:last-of-type");
    const topBufferHeight = topBuffer ? topBuffer.offsetHeight : 0;
    const bottomBufferHeight = bottomBuffer ? bottomBuffer.offsetHeight : 0;
    const vh = window.innerHeight;
    const availableVh = vh - navHeight;

    let TOP_OFFSET = -(availableVh / 2 - LOGO_HEIGHT / 2 - topBufferHeight);
    let BOTTOM_OFFSET = availableVh / 2 - LOGO_HEIGHT / 2 - bottomBufferHeight;

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
    const ease = ANIMATION_CONFIG.defaultEase;
    const experienceArticles = document.querySelectorAll("#experience article");
    const scrollTriggerOptions = {
        ease,
        start: "top 50%",
        toggleActions: ANIMATION_CONFIG.defaultToggleActions
    }

    experienceArticles.forEach(article => {
        gsap.to(article, {
            duration: ANIMATION_CONFIG.fadeDurationLong,
            x: "0px",
            opacity: 1,
            scrollTrigger: {
                trigger: article,
                ...scrollTriggerOptions
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

        const scrollTriggerOptions = {
            ease: ANIMATION_CONFIG.defaultEase,
            start: "top 50%",
            toggleActions: ANIMATION_CONFIG.defaultToggleActions
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contentElement,
                ...scrollTriggerOptions
            }
        });

        isRow ? tl.to(mediaElement, {
                duration: ANIMATION_CONFIG.fadeDurationLong,
                opacity: 1,
            })
            .to(imageElement, {
                duration: ANIMATION_CONFIG.fadeDurationLong,
                maxWidth: "100%",
            }, "<")
            .to(contentElement, { 
                delay: ANIMATION_CONFIG.defaultDelay,
                duration: ANIMATION_CONFIG.fadeDurationLong, 
                opacity: 1, 
                x: "0px" 
            })
            .to(controlsElement, {
                duration: ANIMATION_CONFIG.fadeDuration,
                opacity: 1,
            })
        :   tl.to(contentElement, { 
                delay: 0, 
                duration: ANIMATION_CONFIG.fadeDurationLong, 
                opacity: 1, 
                x: "0px" 
            })
            .to(mediaElement, {
                duration: ANIMATION_CONFIG.fadeDurationLong,
                opacity: 1,
            })
            .to(imageElement, {
                duration: ANIMATION_CONFIG.fadeDurationLong,
                maxWidth: "100%",
            }, "<")
            .to(controlsElement, {
                duration: ANIMATION_CONFIG.fadeDuration,
                opacity: 1,
            })
        

        return () => tl.kill();
    });
}

function animatePageTransition() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: resolve
        });
        tl.to(
            "main",
            {
                opacity: 0,
                ease: "power1.out",
                duration: .3,
            }
        );
    });
}

function initInternalLinks() {
    const internalLinks = document.querySelectorAll('[data-linkType="internal"]');
    
    internalLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.getAttribute("href");

            animatePageTransition().then(() => window.location.href = href);
        });
    });
}

function initContactAnimation() {
    const bumper = document.querySelector(".svg-location-bumper");
    const maskBorder = document.querySelector("#contact .location-column .row .svg-location-border");
    const container = document.querySelector("#contact .location-column .row .container");
    const content = container.querySelector(":scope > .location");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: bumper,
            start: "top 70%",
            ease: ANIMATION_CONFIG.defaultEase,
            toggleActions: ANIMATION_CONFIG.defaultToggleActions
        }
    });

    tl.to(bumper, { delay: ANIMATION_CONFIG.defaultDelay, duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1 })
      .to(container, { duration: ANIMATION_CONFIG.expandDuration, maxWidth: "160px" }, "<")
      .to(maskBorder, { duration: ANIMATION_CONFIG.expandDuration, maxWidth: "100%", opacity: 1 }, "<")
      .to(content, { duration: ANIMATION_CONFIG.fadeDurationLong, opacity: 1 });
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
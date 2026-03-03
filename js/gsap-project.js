import { ANIMATION_CONFIG } from "./animationConfig.js";

function initLoadIn() {
    const tl = gsap.timeline();
    tl.to(
        "main",
        {
            opacity: 1,
            ease: "power1.out",
            duration: .3,
        }
    );
}

function animatePageTransition() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: resolve
        })
        tl.to(
            "main",
            {
                opacity: 0,
                ease: "power1.out",
                duration: .3,
            }
        )
    });
}

function initInternalLinks() {
    document.querySelectorAll('[data-linkType="internal"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.getAttribute("href");
    
            animatePageTransition().then(() => window.location.href = href);
        });
    });
}

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
    const duration = ANIMATION_CONFIG.fadeDuration;
    const spread = document.querySelector("#selected-mockups .card-spread");

    const scrollTriggerOptions = {
        ease: "power4.out",
        start: "top 50%",
        toggleActions: ANIMATION_CONFIG.defaultToggleActions
    }
    const scrollTrigger = {
        trigger: spread,
        ...scrollTriggerOptions
    }

    const tl = gsap.timeline({scrollTrigger});
    tl.to(spread, {
        duration,
        opacity: 1,
    });  
}

function initFigmaAnimation() {
    const figmaEmbed = document.querySelector("#figma .file-preview");
    const scrollTriggerOptions = {
        ease: ANIMATION_CONFIG.defaultEase,
        start: "top 65%",
        toggleActions: ANIMATION_CONFIG.defaultToggleActions
    }
    gsap.to(figmaEmbed, {
        duration: ANIMATION_CONFIG.fadeDurationLong,
        opacity: 1,
        scrollTrigger: {
            trigger: figmaEmbed,
            ...scrollTriggerOptions
        }
    });
}

function initBlockReveal(indicator, start) {
    const text = indicator.textContent.trim();
    indicator.textContent = "";

    const container = document.createElement("span");
    container.className = "br-container";

    const textNode = document.createElement("span");
    textNode.className = "br-text";
    textNode.textContent = text;

    const wipe = document.createElement("span");
    wipe.className = "br-wipe";

    container.append(wipe, textNode);
    indicator.appendChild(container);

    const split = new SplitText(textNode, {
        type: "lines",
        linesClass: "br-line"
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: indicator,
            start,
            toggleActions: "play none none none"
        }
    })
        .fromTo(
            wipe,
            { x: "-101%" },
            {
                x: "101%",
                duration: 0.6,
                ease: "power4.inOut"
            }
        )
        .to(
            split.lines,
            {
                opacity: 1,
                duration: 0.15,
                stagger: 0.05,
                ease: "none"
            },
            "-=0.3"
        )
        .to(
            wipe, 
            {
                x: "202%",
                duration: 0.6,
                ease: "power4.inOut"
            }
        );
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
    initInternalLinks();
    initDetailsAnimation();
    initCardAnimation();
    initFigmaAnimation();
    initContactAnimation();
};
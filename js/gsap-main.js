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
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;

        gsap.to(".home__content .text", {
            delay: 2.5, // Delay to match reveal of .home__content bg
            opacity: 1
        });
        const tl = gsap.timeline();
        tl.to(".home__content", {
            delay: .5,
            duration: .25,
            ease: "power4.inOut",
            opacity: 1
        });
        tl.to(".home__content", {
            delay: .5,
            duration: .5,
            ease: "power4.inOut",
            rotation: 0
        });
        tl.to(".home__content", {
            duration: .5,
            ease: "power4.inOut",
            paddingTop: isRow ? 16 : 24,
            paddingBottom: isRow ? 16 : 24,
            paddingLeft: 24,
            paddingRight: 24,
            width: isRow ? 350 : 292,
            height: isRow ? 140 : 164,
            background: "rgba(20, 21, 21, .7)"
        });
    });  
}

function initAboutAnimation() {
    const contentElement = document.querySelector("#about .content");
    const videoElement = document.querySelector("#about .content video");
    const textElement = document.querySelector("#about .content .text");
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;
        const scrollTriggerOptions = {
            ease: "power4.inOut",
            start: "top 50%",
            toggleActions: "play none none none"
        }
        
        if (isRow) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contentElement,
                    ...scrollTriggerOptions
                },
            });
            tl.to(videoElement, {
                duration: .6,
                opacity: 1,
                x: "0px"
            });
            tl.to(textElement, {
                duration: .6,
                opacity: 1,
                x: "0px"
            });
        } else {
            gsap.to(videoElement, {
                duration: .6,
                opacity: 1,
                x: "0px",
                scrollTrigger: {
                    trigger: videoElement,
                    ...scrollTriggerOptions
                },
            });
            gsap.to(textElement, {
                duration: .6,
                opacity: 1,
                x: "0px",
                scrollTrigger: {
                    trigger: textElement,
                    ...scrollTriggerOptions
                },
            });
        }
    }); 
}

function pinParticleLogos() {
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;

        // if (isRow) {
            const articlesContainer = document.querySelector("#experience .articles");
            const particleColumn = document.querySelector(".particle-column");
        
            const logo = document.querySelector("#particle-logo");
            const LOGO_HEIGHT = 250;
            const ENTRY_RANGE = 0.35;
            const EXIT_RANGE = 0.35;
        
            const topBuffer = document.querySelector(".article-column .noise-trigger:first-of-type");
            const bottomBuffer = document.querySelector(".article-column .noise-trigger:last-of-type");
            const topBufferHeight = topBuffer ? topBuffer.offsetHeight : 0;
            const bottomBufferHeight = bottomBuffer ? bottomBuffer.offsetHeight : 0;
            const vh = window.innerHeight;
        
            let TOP_OFFSET = -(vh / 2 - LOGO_HEIGHT / 2 - topBufferHeight);
            let BOTTOM_OFFSET = vh / 2 - LOGO_HEIGHT / 2 - bottomBufferHeight;
        
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
        // }
    });
}

function initExperienceArticleAnimations() {
    const particleColumn = document.querySelector("#experience .particle-column");
    const experienceArticles = document.querySelectorAll("#experience article");
    const scrollTriggerOptions = {
        ease: "power4.inOut",
        start: "top 50%",
        toggleActions: "play none none none"
    }
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;

        experienceArticles.forEach(article => {
            gsap.to(article, {
                duration: .6,
                x: "0px",
                opacity: 1,
                scrollTrigger: {
                    trigger: article,
                    ...scrollTriggerOptions
                }
            });
        });
        gsap.to(particleColumn, {
            duration: .6,
            opacity: isRow ? 1 : .7,
            scrollTrigger: {
                trigger: particleColumn,
                ...scrollTriggerOptions
            }
        });
    });
}

function initAvailoFeature() {
    const phoneOver = document.querySelector("#phoneOver");
    const phoneUnder = document.querySelector("#phoneUnder");
    const phones = [phoneOver, phoneUnder];
    const phoneGroupElement = document.querySelector("#projects .phones");
    const contentElement = document.querySelector("#availo .content");
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 750px)",
        isRow: "(min-width: 751px)" 
    }, (context) => {
        const { isRow } = context.conditions;
        const scrollTriggerOptions = {
            ease: "power4.inOut",
            start: "top 50%",
            toggleActions: "play none none none"
        }

        
        // Phones
        const phoneTL = gsap.timeline({
            scrollTrigger: {
                trigger: phoneGroupElement,
                ...scrollTriggerOptions
            },
            onComplete: () => {
                phoneOver.classList.add("levitate");
                phoneUnder.classList.add("levitate");
            }
        });
        phoneTL.to(phoneGroupElement, {
            duration: .6,
            x: "0px",
            opacity: 1,
        });
        phoneTL.to(phones, {
            duration: .6,
            y: "0px",
            opacity: 1,
        });
        gsap.to(phoneOver, {
            delay: .5,
            duration: .3,
            rotate: 4,
            scrollTrigger: {
                trigger: phoneGroupElement,
                ...scrollTriggerOptions
            },
        });
        gsap.to(phoneUnder, {
            delay: .5,
            duration: .3,
            rotate: -4,
            scrollTrigger: {
                trigger: phoneGroupElement,
                ...scrollTriggerOptions
            },
        });
        // Content
        gsap.to(contentElement, {
            delay: isRow ? 1 : 0,
            duration: .6,
            x: "0px",
            opacity: 1,
            scrollTrigger: {
                trigger: isRow ? phoneGroupElement : contentElement,
                ...scrollTriggerOptions
            }
        });
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

function initTextIndicators() {
    const sectionIndicators = document.querySelectorAll(".section-indicator");
    const contactIndicators = document.querySelectorAll("#contact .section-indicator");
    const contactPercentages = [
        "top 85%",
        "top 90%",
        "top 95%"
    ];

    // Main Indicators (Default Trigger Position)
    for (let i=0; i<=(sectionIndicators.length - contactIndicators.length - 1); i++) {
        const indicator = sectionIndicators[i];
        initBlockReveal(indicator, "top 80%");
    }
    // Contact Indicators
    for (let i=0; i<=(contactIndicators.length - 1); i++) {
        const indicator = contactIndicators[i];
        initBlockReveal(indicator, contactPercentages[i]);
    }
}

function completeContactAnimation() {
    const contactIndicators = document.querySelectorAll("#contact .section-indicator");
    const indicatorPercentages = [
        "top 85%",
        "top 90%",
        "top 95%"
    ];
    // Contact Indicators
    for (let i=0; i<=(contactIndicators.length - 1); i++) {
        const indicatorScrollTriggerOptions = {
            ease: "power4.inOut",
            start: indicatorPercentages[i],
            toggleActions: "play none none none"
        }
        const indicator = contactIndicators[i];
        const sibling = indicator.nextSibling.nextSibling;
        gsap.to(sibling,{
            delay: .6,
            duration: .3,
            opacity: 1,
            x: "0px",
            scrollTrigger: {
                trigger: indicator,
                ...indicatorScrollTriggerOptions
            },
        })
    }

    // const locationElement = document.querySelector("#contact .location-column .location");
    // const coordinatesElement = document.querySelector("#contact .location-column .coordinates");
    // const elementGroup = [
    //     locationElement,
    //     coordinatesElement
    // ];
    // const mm = gsap.matchMedia();
    // mm.add({
    //     isColumn: "(max-width: 500px)",
    //     isRow: "(min-width: 501px)" 
    // }, (context) => {
    //     const { isRow } = context.conditions;
    //     const locationScrollTriggerOptions = {
    //         trigger: isRow ? contactIndicators[1] : contactIndicators[2],
    //         ease: "power4.inOut",
    //         start: isRow ? indicatorPercentages[1] : "top 50%",
    //         toggleActions: "play none none none"
    //     }
    //     gsap.to(elementGroup, {
    //         delay: isRow ? 1.2 : 0,
    //         duration: .6,
    //         opacity: 1,
    //         x: 0,
    //         scrollTrigger: {
    //             ...locationScrollTriggerOptions
    //         }
    //     });
    // });  
}

gsap.registerPlugin(SplitText, ScrollTrigger);
document.fonts.ready.then(() => {
    initTextIndicators();
});
window.onload = () => {
    initLoadIn();
    initHeroAnimation();
    initAboutAnimation();
    pinParticleLogos();
    initExperienceArticleAnimations();
    initAvailoFeature();
    initInternalLinks();
    completeContactAnimation();
}
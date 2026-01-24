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
        const scrollTriggerOptions = {
            ease: "power4.inOut",
            start: "top 50%",
            toggleActions: "play none none none"
        }
        if (isRow) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    ...scrollTriggerOptions
                }
            });
            timeline.to(metadata, {
                duration: .6,
                x: 0,
                opacity: 1
            });
            timeline.to(description, {
                duration: .6,
                x: 0,
                opacity: 1
            });
        } else {
            gsap.to(metadata, {
                duration: .6,
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: metadata,
                    ...scrollTriggerOptions
                }
            });
            gsap.to(description, {
                duration: .6,
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: description,
                    ...scrollTriggerOptions
                }
            });
        }
    });  
}

function initCardAnimation() {
    const duration = .6;
    const spread = document.querySelector("#selected-mockups .card-spread");
    const card1 = document.querySelector("#card1");
    const card2 = document.querySelector("#card2");
    const card3 = document.querySelector("#card3");
    const card4 = document.querySelector("#card4");
    const card5 = document.querySelector("#card5");
    const card6 = document.querySelector("#card6");
    const card7 = document.querySelector("#card7");
    const rotationDegrees = ["0deg", "7deg", "14deg", "21deg"];
        
    const mm = gsap.matchMedia();
    mm.add({
        isColumn: "(max-width: 1000px)",
        isRow: "(min-width: 1001px)" 
    }, (context) => {
        const { isRow } = context.conditions;
        const xDisplacement = isRow ? 
            ["0px", "100px", "200px", "300px"]
            : ["0px", "75px", "125px", "175px"];
        const yDisplacement = isRow ? 
            ["0px", "24px", "48px", "96px"]
            : ["0px", "12px", "24px", "48px"];
        const scrollTriggerOptions = {
            ease: "power4.inOut",
            start: "top 50%",
            toggleActions: "play none none none"
        }
        const scrollTrigger = {
            trigger: spread,
            ...scrollTriggerOptions
        }

        const leftTimeline = gsap.timeline({scrollTrigger}, 0);
        const rightTimeline = gsap.timeline({
            onComplete: () => {
                const cards = document.querySelectorAll("#selected-mockups .card");
                cards.forEach(card => card.style.transition = ".3s");
            },
            scrollTrigger
        }, 0);
        // Pull cards up in "hand"
        leftTimeline.to(card1, {
            duration,
            opacity: 1,
            y: 0,
        });
        rightTimeline.to(card7, {
            duration,
            delay: .3,
            opacity: 1,
            y: 0,
        });
        // -
        leftTimeline.to(card2, {
            duration,
            opacity: 1,
            y: 0,
        });
        rightTimeline.to(card6, {
            duration,
            opacity: 1,
            y: 0,
        });
        // -
        leftTimeline.to(card3, {
            duration,
            opacity: 1,
            y: 0,
        });
        rightTimeline.to(card5, {
            duration,
            opacity: 1,
            y: 0,
        });
        // -
        leftTimeline.to(card4, {
            duration,
            delay: .05,
            opacity: 1,
            y: 0,
        });
        // -
        // Tier 1 items shuffle out
        leftTimeline.to(card3, {
            delay: .15,
            duration,
            x: `-${xDisplacement[xDisplacement.length - 3]}`,
            y: `+=${yDisplacement[yDisplacement.length - 3]}`,
            rotation: `-${rotationDegrees[rotationDegrees.length - 3]}`,
        });
        rightTimeline.to(card5, {
            delay: .6,
            duration,
            x: `${xDisplacement[xDisplacement.length - 3]}`,
            y: `+=${yDisplacement[yDisplacement.length - 3]}`,
            rotation: `${rotationDegrees[rotationDegrees.length - 3]}`,
        });
        // Tier 2 items shuffle out
        leftTimeline.to(card2, {
            duration,
            x: `-${xDisplacement[xDisplacement.length - 2]}`,
            y: `+=${yDisplacement[yDisplacement.length - 2]}`,
            rotation: `-${rotationDegrees[rotationDegrees.length - 2]}`,
        });
        rightTimeline.to(card6, {
            duration,
            x: `${xDisplacement[xDisplacement.length - 2]}`,
            y: `+=${yDisplacement[yDisplacement.length - 2]}`,
            rotation: `${rotationDegrees[rotationDegrees.length - 2]}`,
        });
        // Tier 3 items shuffle out
        leftTimeline.to(card1, {
            duration,
            x: `-${xDisplacement[xDisplacement.length - 1]}`,
            y: `+=${yDisplacement[yDisplacement.length - 1]}`,
            rotation: `-${rotationDegrees[rotationDegrees.length - 1]}`,
        });
        rightTimeline.to(card7, {
            duration,
            x: `${xDisplacement[xDisplacement.length - 1]}`,
            y: `+=${yDisplacement[yDisplacement.length - 1]}`,
            rotation: `${rotationDegrees[rotationDegrees.length - 1]}`,
        });
    });   
}

function initFigmaAnimation() {
    const figmaEmbed = document.querySelector("#figma .embed-container");
    const scrollTriggerOptions = {
        ease: "power4.inOut",
        start: "top 60%",
        toggleActions: "play none none none"
    }
    gsap.to(figmaEmbed, {
        duration: .6,
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: figmaEmbed,
            ...scrollTriggerOptions
        }
    });
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

    for (let i=0; i<=(sectionIndicators.length - contactIndicators.length - 1); i++) {
        const indicator = sectionIndicators[i];
        initBlockReveal(indicator, "top 80%");
    }    
    for (let i=0; i<=(contactIndicators.length - 1); i++) {
        const indicator = contactIndicators[i];
        initBlockReveal(indicator, contactPercentages[i]);
    }
}

gsap.registerPlugin(SplitText, ScrollTrigger);
document.fonts.ready.then(() => {
    initTextIndicators();
});
window.onload = () => {
    initLoadIn();
    initInternalLinks();
    initDetailsAnimation();
    initCardAnimation();
    initFigmaAnimation();
    completeContactAnimation();
};
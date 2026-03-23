export function initBackground(container, options = {}) {

  // ─── Accessibility guard ─────────────────────────────────────────────────
  // Respect the user's OS-level "reduce motion" preference — skip all DOM
  // creation entirely so there's zero memory / GPU overhead for those users.

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { setIconSet: () => {}, destroy: () => {} }
  }

  // ─── Config ──────────────────────────────────────────────────────────────

  let observer;
  const config = {
    iconColor: "#E4E6E7",

    spacingX: 200,
    spacingY: 200,

    angle: 5,  // degrees — direction of the diagonal placement

    layer: { scale: [0.4, 0.9], opacity: [0.04, 0.12] },

    sway: {
      translateX:  10,   // px — max horizontal drift (±)
      translateY:  10,   // px — max vertical drift (±)
      rotate:      10, // deg — max rotation (±)
      durationMin: 3,   // s — slowest sway cycle
      durationMax: 6,  // s — fastest sway cycle
    },

    iconSets: {
        default: [
          '/assets/svg/personal_logo_white.svg',
          '/assets/svg/shaka-04.svg',
          '/assets/svg/hand-peace-solid.svg',
          '/assets/svg/personal_logo_white.svg',
        ],
        about: [
          '/assets/svg/code-solid.svg',
          '/assets/svg/paintbrush-solid.svg',
          '/assets/svg/handshake-solid.svg',
        ],
        as: [
          '/assets/svg/auctioneer_software.svg'
        ],
        ji: [
          '/assets/svg/personal_logo_white.svg',
        ],
        pu: [
          '/assets/svg/propelup.svg'
        ],
        availo: [
          '/assets/svg/availo.svg'
        ],
        dnd: [
          '/assets/svg/5ehblogo_cropped.svg'
        ],
        paperboy: [
          '/assets/svg/paperboy-mascot.svg'
        ],
    },

    activeSet: 'default',

    ...options
  }

  // ─── State ───────────────────────────────────────────────────────────────

  const state = {
    icons:     [],
    activeSet: config.activeSet
  }

  // ─── Constants (angle never changes at runtime) ──────────────────────────

  const angleRad = config.angle * Math.PI / 180
  const sinA     = Math.sin(angleRad)

  // ─── Jitter pool ─────────────────────────────────────────────────────────
  // 24 discrete offset vectors evenly distributed around a full circle.
  // Guarantees every direction is represented — no random clustering.
  // Cap at 25% of spacing so adjacent icons on the single layer never overlap.

  const jitterPool = (() => {
    const count = 24
    const pool  = new Array(count)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pool[i] = {
        jitterX: Math.cos(angle) * config.spacingX * 0.25,
        jitterY: Math.sin(angle) * config.spacingY * 0.25
      }
    }
    return pool
  })()

  // ─── DOM root ────────────────────────────────────────────────────────────

  const bgContainer = document.createElement('div')
  bgContainer.className = 'bg-container'
  container.prepend(bgContainer)

  // ─── Resize rebuild (ResizeObserver) ─────────────────────────────────────
  // Debounced at 250 ms. Clears only the bg-layer divs (not page sections)
  // then recomputes geometry + a fresh variation table for the new dimensions.

  let resizeObserver, resizeTimer
  function initResizeObserver() {
    resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        bgContainer.innerHTML = ''
        state.icons = []
        geo      = buildGeometry()
        varTable = buildVarTable(geo.cols * geo.rows)
        initLayer(geo, varTable)
      }, 250)
    })
    resizeObserver.observe(container)
  }

  // ─── Init ────────────────────────────────────────────────────────────────

  let geo = buildGeometry()
  let varTable = buildVarTable(geo.cols * geo.rows)

  initLayer(geo, varTable)
  initResizeObserver()

  return { setIconSet, setIconColor, destroy, initScrollTriggers }

  // ─── Geometry ────────────────────────────────────────────────────────────
  // Returns a plain object so it can be recomputed on resize without closures.

  function buildGeometry() {
    const rect       = container.getBoundingClientRect()
    const containerW = rect.width  || window.innerWidth
    const containerH = rect.height || window.innerHeight

    // Expand the bg-layer so its rotated footprint fully covers the container.
    const layerW  = containerW + containerH * sinA + 2 * config.spacingX
    const layerH  = containerH + containerW * sinA + 2 * config.spacingY
    const offsetX = -((layerW - containerW) / 2)
    const offsetY = -((layerH - containerH) / 2)

    const cols = Math.ceil(layerW / config.spacingX) + 1
    const rows = Math.ceil(layerH / config.spacingY) + 1

    return { containerW, containerH, layerW, layerH, offsetX, offsetY, cols, rows }
  }

  // ─── Variation table ─────────────────────────────────────────────────────
  // Pre-computes one entry per grid cell. Jitter is drawn from the pool;
  // scale/opacity are independently random.

  function buildVarTable(n) {
    const t = new Array(n)
    for (let i = 0; i < n; i++) {
      const { jitterX, jitterY } = randomFrom(jitterPool)
      t[i] = {
        scaleT:   Math.random(),
        opacityT: Math.random(),
        jitterX,
        jitterY
      }
    }
    return t
  }

  // ─── Layer setup ─────────────────────────────────────────────────────────

  function initLayer({ layerW, layerH, offsetX, offsetY, cols, rows }, vars) {

    const currentSet = config.iconSets[state.activeSet] ?? Object.values(config.iconSets)[0]

    const layerEl = document.createElement('div')
    layerEl.className = 'bg-layer'

    layerEl.style.cssText = `
      position: absolute;
      width: ${layerW}px;
      height: ${layerH}px;
      left: ${offsetX}px;
      top: ${offsetY}px;
      overflow: hidden;
      pointer-events: none;
      transform: rotate(${-config.angle}deg);
      transform-origin: center center;
    `
    bgContainer.appendChild(layerEl)

    const innerEl = document.createElement('div')
    innerEl.className = 'bg-inner'
    innerEl.style.width  = `${layerW}px`
    innerEl.style.height = `${layerH}px`
    layerEl.appendChild(innerEl)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {

        const { scaleT, opacityT, jitterX, jitterY } = vars[row * cols + col]

        const scale   = lerp(config.layer.scale[0],   config.layer.scale[1],   scaleT)
        const opacity = lerp(config.layer.opacity[0], config.layer.opacity[1], opacityT)

        const x = col * config.spacingX + jitterX
        const y = row * config.spacingY + jitterY

        const src = randomFrom(currentSet)
        const el  = makeIcon(src, x, y, scale, opacity)
        innerEl.appendChild(el)
        state.icons.push({ el, opacity, src })
      }
    }
  }

  // ─── Icon factory ────────────────────────────────────────────────────────
  // Uses <div> + CSS mask-image rather than <img>.
  // mask-image composites background-color through the SVG's alpha channel,
  // giving full control over icon colour via config.iconColor.

  function makeIcon(src, x, y, scale, opacity) {
    const { translateX, translateY, rotate, durationMin, durationMax } = config.sway
    const swayX = (Math.random() * translateX * 2 - translateX).toFixed(1)
    const swayY = (Math.random() * translateY * 2 - translateY).toFixed(1)
    const swayR = (Math.random() * rotate     * 2 - rotate).toFixed(1)
    const dur   = (durationMin + Math.random() * (durationMax - durationMin)).toFixed(1)
    const delay = -(Math.random() * durationMax).toFixed(1)

    const el     = document.createElement('div')
    el.className = 'bg-icon'
    el.style.cssText = [
      `left: ${x}px`,
      `top: ${y}px`,
      `--icon-scale: ${scale}`,
      `--sway-x: ${swayX}px`,
      `--sway-y: ${swayY}px`,
      `--sway-r: ${swayR}deg`,
      `animation: sway ${dur}s ease-in-out ${delay}s infinite alternate`,
      `opacity: ${opacity}`,
      `background-color: ${config.iconColor}`,
      `-webkit-mask-image: url("${src}")`,
      `mask-image: url("${src}")`
    ].join(';')
    return el
  }

  // ─── Icon transitions ────────────────────────────────────────────────────
  // Fades the icon out, waits for transitionend, swaps the mask-image URL,
  // then fades back in. icon.src tracks the current URL so we can skip
  // redundant swaps.

  function swapIcon(icon, iconSet) {
    const next = randomFrom(iconSet)
    if (icon.src === next) return
    icon.src = next   // update tracked src immediately to block duplicate calls

    icon.el.style.transition = 'opacity 0.3s'
    icon.el.style.opacity    = 0

    icon.el.addEventListener('transitionend', () => {
      icon.el.style.setProperty('-webkit-mask-image', `url("${next}")`)
      icon.el.style.setProperty('mask-image',         `url("${next}")`)
      icon.el.style.opacity = icon.opacity
    }, { once: true })
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  function setIconColor(color) {
    config.iconColor = color
    state.icons.forEach(icon => {
      icon.el.style.backgroundColor = color
    })
  }

  function setIconSet(name) {
    const set = config.iconSets[name]
    if (!set) { console.warn(`svgBG: unknown icon set "${name}"`); return }
    state.activeSet = name
    state.icons.forEach(icon => swapIcon(icon, set))
  }

  // ─── Scroll-triggered icon set switching ─────────────────────────────────
  // Called by the host page after GSAP's ScrollTrigger is registered.
  // Accepts ScrollTrigger as a parameter so svgBG.js stays dependency-free.

  function initScrollTriggers(ST) {
    let lastProjectSet = 'availo'
    document.addEventListener('project:change', (e) => {
      lastProjectSet = e.detail.slide
      setIconSet(e.detail.slide)
    })

    const sectionMap = [
      { selector: '#home',       set: 'default',    back: null },
      { selector: '#about',       set: 'about',    back: 'default' },
      { selector: '#as-article',  set: 'as',       back: 'about'   },
      { selector: '#jmi-article', set: 'ji',       back: 'as'      },
      { selector: '#pu-article',  set: 'pu',       back: 'ji'      },
      { selector: '#projects',    set: () => lastProjectSet, back: 'pu' },
      { selector: '#availo-project', set: 'availo', back: null      },
    ]

    sectionMap.forEach(({ selector, set, back }) => {
      const el = document.querySelector(selector)
      if (!el) return   // graceful skip — section may not exist on every page

      ST.create({
        trigger:     el,
        start:       'top 55%',
        onEnter:     () => setIconSet(typeof set === 'function' ? set() : set),
        onLeaveBack: () => { if (back) setIconSet(back) },
      })
    })
  }

  // ─── Cleanup ─────────────────────────────────────────────────────────────

  function destroy() {
    resizeObserver?.disconnect()
    clearTimeout(resizeTimer)
    bgContainer.remove()
    state.icons = []
  }

  // ─── Utilities ───────────────────────────────────────────────────────────

  function lerp(a, b, t) { return a + (b - a) * t }
  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)] }
}

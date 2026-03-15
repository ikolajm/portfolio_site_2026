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

    spacingX: 400,
    spacingY: 400,

    angle: 5,  // degrees — direction of the diagonal march

    layers: [
      { speed: 2.5,  scale: [0.30, 0.50], opacity: [0.025, 0.05] },
      { speed: 5, scale: [0.50, 0.75], opacity: [0.05,  0.10] },
      { speed: 7.5, scale: [0.75, 1.15], opacity: [0.10,  0.15] }
    ],

    iconSets: {
        default: ['/assets/svg/personal_logo_white.svg'],
        about: ['/assets/svg/personal_logo_white.svg'],
        as: ['/assets/svg/auctioneer_software.svg'],
        ji: ['/assets/svg/personal_logo_white.svg'],
        pu: ['/assets/svg/propelup.svg'],
        projects: [
            '/assets/svg/code-solid.svg',
            '/assets/svg/terminal-solid.svg',
        ],
        availo: ['assets/svg/availo.svg'],
    },

    activeSet: 'default',

    ...options
  }

  // ─── State ───────────────────────────────────────────────────────────────

  const state = {
    layers:    [],
    activeSet: config.activeSet
  }

  // ─── Constants (angle never changes at runtime) ──────────────────────────

  const angleRad = config.angle * Math.PI / 180
  const sinA     = Math.sin(angleRad)

  // ─── Jitter pool ─────────────────────────────────────────────────────────
  // 24 discrete offset vectors evenly distributed around a full circle.
  // Guarantees every direction is represented — no random clustering.
  // Declared here (before the init block) so buildVarTable can reference it
  // without hitting the temporal dead zone.

  const jitterPool = (() => {
    const count = 24
    const pool  = new Array(count)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pool[i] = {
        jitterX: Math.cos(angle) * config.spacingX * 0.5,
        jitterY: Math.sin(angle) * config.spacingY * 0.5
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
        state.layers = []
        geo      = buildGeometry()
        varTable = buildVarTable(geo.cols * geo.rows)
        initLayers(geo, varTable)
      }, 250)
    })
    resizeObserver.observe(container)
  }

  // ─── Init ────────────────────────────────────────────────────────────────

  let geo = buildGeometry()
  let varTable = buildVarTable(geo.cols * geo.rows)

  initLayers(geo, varTable)
  initVisibilityPause()
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

    const cols      = Math.ceil(layerW / config.spacingX) + 1
    const rows      = Math.ceil(layerH / config.spacingY) + 1
    const gridWidth = cols * config.spacingX   // X-axis double-buffer period

    return { containerW, containerH, layerW, layerH, offsetX, offsetY, cols, rows, gridWidth }
  }

  // ─── Variation table ─────────────────────────────────────────────────────
  // Pre-computes one entry per grid cell. All layers share the same table so
  // icons align spatially across depth planes — reads as intentional 3D depth.
  // Jitter is drawn randomly from the pool; scale/opacity remain independently
  // random. The inner loop indexes in rather than calling Math.random() per icon.

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

  function initLayers({ layerW, layerH, offsetX, offsetY, cols, rows, gridWidth }, vars) {

    const currentSet = config.iconSets[state.activeSet] ?? Object.values(config.iconSets)[0]

    config.layers.forEach((layerConfig, layerIndex) => {

      const layerEl = document.createElement('div')
      layerEl.className = 'bg-layer'

      // Sizing and rotation applied as inline styles — CSS carries only
      // overflow and pointer-events so these are easy to override.
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
      // JS owns width/height — CSS provides animation + will-change only.
      innerEl.style.width  = `${2 * gridWidth}px`
      innerEl.style.height = `${layerH}px`

      // Stagger each layer's starting phase so they don't all begin at
      // translateX(-50%) simultaneously — which causes all icons to visually
      // stack on load before slowly drifting apart.
      // Layer 0 → phase 0, Layer 1 → phase 33%, Layer 2 → phase 66%.
      const duration    = gridWidth / layerConfig.speed
      const phaseOffset = layerIndex / config.layers.length   // 0, 0.33, 0.66…
      innerEl.style.setProperty('--scroll-duration', `${duration}s`)
      innerEl.style.animationDelay = `${-(duration * phaseOffset)}s`
      layerEl.appendChild(innerEl)

      const colA = []
      const colB = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

          // Pull precomputed values — no Math.random() calls in this loop.
          const { scaleT, opacityT, jitterX, jitterY } = vars[row * cols + col]

          const scale   = lerp(layerConfig.scale[0],   layerConfig.scale[1],   scaleT)
          const opacity = lerp(layerConfig.opacity[0], layerConfig.opacity[1], opacityT)

          const baseX = col * config.spacingX
          const baseY = row * config.spacingY

          // Column A — left half of bg-inner (visible at translateX(0))
          const srcA = randomFrom(currentSet)
          const elA  = makeIcon(srcA, baseX + jitterX, baseY + jitterY, scale, opacity)
          innerEl.appendChild(elA)
          colA.push({ el: elA, opacity, src: srcA })

          // Column B — right half, offset by gridWidth; scrolls into view first.
          // Same jitter ensures the seam tiles perfectly.
          const srcB = randomFrom(currentSet)
          const elB  = makeIcon(srcB, baseX + gridWidth + jitterX, baseY + jitterY, scale, opacity)
          innerEl.appendChild(elB)
          colB.push({ el: elB, opacity, src: srcB })
        }
      }

      const layer = { innerEl, colA, colB, pendingIconSet: null }

      // At each loop boundary, Column B is off-screen (translateX(-50%) → reset),
      // so we swap its icons invisibly while Column A is fully visible.
      innerEl.addEventListener('animationiteration', () => {
        if (!layer.pendingIconSet) return
        const nextSet = layer.pendingIconSet
        layer.colB.forEach(icon => swapIcon(icon, nextSet))
        layer.pendingIconSet = null
      })

      state.layers.push(layer)
    })
  }

  // ─── Icon factory ────────────────────────────────────────────────────────
  // Uses <div> + CSS mask-image rather than <img>.
  // mask-image composites background-color through the SVG's alpha channel,
  // giving full control over icon colour via config.iconColor.
  // fill/stroke on <img> have no effect — they only work on inline <svg>.

  function makeIcon(src, x, y, scale, opacity) {
    const el     = document.createElement('div')
    el.className = 'bg-icon'
    el.style.cssText = [
      `left: ${x}px`,
      `top: ${y}px`,
      `transform: scale(${scale})`,
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
    state.layers.forEach(layer => {
      ;[...layer.colA, ...layer.colB].forEach(icon => {
        icon.el.style.backgroundColor = color
      })
    })
  }

  function setIconSet(name) {
    const set = config.iconSets[name]
    if (!set) { console.warn(`svgBG: unknown icon set "${name}"`); return }
    state.activeSet = name
    // Swap immediately with a fade — do not defer to animationiteration.
    // The loop period can be many minutes with large spacingX values, so
    // pendingIconSet would never resolve during normal browsing.
    state.layers.forEach(layer => {
      ;[...layer.colA, ...layer.colB].forEach(icon => swapIcon(icon, set))
    })
  }

  // ─── Scroll-triggered icon set switching ─────────────────────────────────
  // Called by the host page after GSAP's ScrollTrigger is registered.
  // Accepts ScrollTrigger as a parameter so svgBG.js stays dependency-free.
  //
  // Map:  section/article DOM id → { set: icon set on enter, back: icon set on leave-back }
  // onEnter     fires scrolling DOWN when the element's top crosses 'start'
  // onLeaveBack fires scrolling UP   when the element's top recrosses 'start'
  // No onLeave / onEnterBack needed — the chain of onLeaveBack calls restores
  // state correctly in reverse order when scrolling back up.

  function initScrollTriggers(ST) {
    const sectionMap = [
      { selector: '#home',       set: 'default',    back: null },
      { selector: '#about',       set: 'about',    back: 'default' },
      { selector: '#as-article',  set: 'as',       back: 'about'   },
      { selector: '#jmi-article', set: 'ji',       back: 'as'      },
      { selector: '#pu-article',  set: 'pu',       back: 'ji'      },
      { selector: '#projects',    set: 'projects', back: 'pu'      },
      { selector: '#availo-project', set: 'availo', back: null      },
    ]

    sectionMap.forEach(({ selector, set, back }) => {
      const el = document.querySelector(selector)
      if (!el) return   // graceful skip — section may not exist on every page

      ST.create({
        trigger:     el,
        start:       'top 55%',   // fires when element top hits 55% down the viewport
        onEnter:     () => setIconSet(set),
        onLeaveBack: () => setIconSet(back),
      })
    })
  }

  // ─── Visibility pause (IntersectionObserver) ─────────────────────────────

  function initVisibilityPause() {
    observer = new IntersectionObserver(([entry]) => {
      const playState = entry.isIntersecting ? 'running' : 'paused'
      state.layers.forEach(l => { l.innerEl.style.animationPlayState = playState })
    }, { threshold: 0, rootMargin: '50px' })  // start 150px before entering view

    observer.observe(container)
  }

  // ─── Cleanup ─────────────────────────────────────────────────────────────

  function destroy() {
    observer?.disconnect()
    resizeObserver?.disconnect()
    clearTimeout(resizeTimer)
    bgContainer.remove()
    state.layers = []
  }

  // ─── Utilities ───────────────────────────────────────────────────────────

  function lerp(a, b, t) { return a + (b - a) * t }
  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)] }
}

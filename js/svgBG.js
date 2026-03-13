export function initBackground(container, options = {}) {

  // ─── Accessibility guard ─────────────────────────────────────────────────
  // Respect the user's OS-level "reduce motion" preference — skip all DOM
  // creation entirely so there's zero memory / GPU overhead for those users.

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { setIconSet: () => {}, destroy: () => {} }
  }

  // ─── Config ──────────────────────────────────────────────────────────────

  const config = {
    iconColor: "#E4E6E7",

    spacingX: 400,
    spacingY: 400,

    angle: 5,  // degrees — direction of the diagonal march

    layers: [
      { speed: 5,  scale: [0.30, 0.50], opacity: [0.025, 0.05] },
      { speed: 10, scale: [0.50, 0.75], opacity: [0.05,  0.10] },
      { speed: 15, scale: [0.75, 1.15], opacity: [0.10,  0.15] }
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
        jitterX: Math.cos(angle) * config.spacingX * 0.3,
        jitterY: Math.sin(angle) * config.spacingY * 0.3
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
  initResizeObserver()

  return { setIconSet, setIconColor, destroy, initScrollTriggers }

  // ─── Geometry ────────────────────────────────────────────────────────────
  // Returns a plain object so it can be recomputed on resize without closures.

  function buildGeometry() {
    // Use viewport dimensions — bgContainer is position:fixed so it always
    // covers exactly the viewport, not the (much taller) inner-content height.
    const containerW = window.innerWidth
    const containerH = window.innerHeight

    // One spacing unit of padding on each side so the rotated layer fully
    // bleeds to the viewport edges. No 2× doubling needed — there is no
    // horizontal scroll loop to maintain.
    const layerW  = containerW + 2 * config.spacingX
    const layerH  = containerH + 2 * config.spacingY
    const offsetX = -config.spacingX
    const offsetY = -config.spacingY

    const cols = Math.ceil(layerW / config.spacingX) + 1
    const rows = Math.ceil(layerH / config.spacingY) + 1

    return { containerW, containerH, layerW, layerH, offsetX, offsetY, cols, rows }
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

  function initLayers({ layerW, layerH, offsetX, offsetY, cols, rows }, vars) {

    const currentSet = config.iconSets[state.activeSet] ?? Object.values(config.iconSets)[0]

    config.layers.forEach((layerConfig) => {

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

      // Flat icon list — no colA/colB split since there is no scroll loop seam.
      const icons = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

          // Pull precomputed values — no Math.random() calls in this loop.
          const { scaleT, opacityT, jitterX, jitterY } = vars[row * cols + col]

          const scale   = lerp(layerConfig.scale[0],   layerConfig.scale[1],   scaleT)
          const opacity = lerp(layerConfig.opacity[0], layerConfig.opacity[1], opacityT)

          const baseX = col * config.spacingX
          const baseY = row * config.spacingY

          const src = randomFrom(currentSet)
          const el  = makeIcon(src, baseX + jitterX, baseY + jitterY, scale, opacity)
          innerEl.appendChild(el)
          icons.push({ el, opacity, src })
        }
      }

      state.layers.push({ innerEl, icons })
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
    // Float duration and a randomised negative delay give each icon an
    // independent phase so the whole grid doesn't pulse in unison.
    const floatDuration = 6 + Math.random() * 6    // 6 – 12 s per cycle
    const floatDelay    = -(Math.random() * 12)     // randomise start phase
    el.style.cssText = [
      `left: ${x}px`,
      `top: ${y}px`,
      `opacity: ${opacity}`,
      `background-color: ${config.iconColor}`,
      `-webkit-mask-image: url("${src}")`,
      `mask-image: url("${src}")`,
      `animation: bg-float ${floatDuration}s ${floatDelay}s ease-in-out infinite`,
    ].join(';')
    // --icon-scale is read by the bg-float keyframe so transform is fully
    // animation-controlled (no inline transform that could conflict).
    el.style.setProperty('--icon-scale', scale)
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
      layer.icons.forEach(icon => {
        icon.el.style.backgroundColor = color
      })
    })
  }

  function setIconSet(name) {
    const set = config.iconSets[name]
    if (!set) { console.warn(`svgBG: unknown icon set "${name}"`); return }
    state.activeSet = name
    state.layers.forEach(layer => {
      layer.icons.forEach(icon => swapIcon(icon, set))
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

  // ─── Cleanup ─────────────────────────────────────────────────────────────

  function destroy() {
    resizeObserver?.disconnect()
    clearTimeout(resizeTimer)
    bgContainer.remove()
    state.layers = []
  }

  // ─── Utilities ───────────────────────────────────────────────────────────

  function lerp(a, b, t) { return a + (b - a) * t }
  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)] }
}

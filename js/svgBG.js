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
    spacingX: 400,
    spacingY: 400,

    angle: 5,  // degrees — direction of the diagonal march

    layers: [
      { speed: 5,  scale: [0.30, 0.50], opacity: [0.025, 0.05] },
      { speed: 10, scale: [0.50, 0.75], opacity: [0.05,  0.10] },
      { speed: 15, scale: [0.75, 1.15], opacity: [0.10,  0.15] }
    ],

    iconSets: {
      default: ['/assets/svg/personal_logo_white.svg']
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
  initVisibilityPause()
  initResizeObserver()

  return { setIconSet, destroy }

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
          const elA = makeIcon(currentSet, baseX + jitterX, baseY + jitterY, scale, opacity)
          innerEl.appendChild(elA)
          colA.push({ el: elA, opacity })

          // Column B — right half, offset by gridWidth; scrolls into view first.
          // Same jitter ensures the seam tiles perfectly.
          const elB = makeIcon(currentSet, baseX + gridWidth + jitterX, baseY + jitterY, scale, opacity)
          innerEl.appendChild(elB)
          colB.push({ el: elB, opacity })
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

  function makeIcon(iconSet, x, y, scale, opacity) {
    const el      = document.createElement('img')
    el.className  = 'bg-icon'
    el.decoding   = 'async'   // decode off the main thread
    el.onerror    = () => { el.style.display = 'none' }  // silent fail
    el.src        = randomFrom(iconSet)
    el.style.cssText = [
      `left: ${x}px`,
      `top: ${y}px`,
      `transform: scale(${scale})`,
      `opacity: ${opacity}`
    ].join(';')
    return el
  }

  // ─── Icon transitions ────────────────────────────────────────────────────

  function swapIcon(icon, iconSet) {
    const next = randomFrom(iconSet)
    if (icon.el.src.endsWith(next)) return
    icon.el.onload = null              // clear any in-flight handler first
    icon.el.style.transition = 'opacity 0.3s'
    icon.el.style.opacity    = 0
    icon.el.onload = () => { icon.el.style.opacity = icon.opacity }
    icon.el.src    = next
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  function setIconSet(name) {
    const set = config.iconSets[name]
    if (!set) { console.warn(`svgBG: unknown icon set "${name}"`); return }
    state.activeSet = name
    state.layers.forEach(layer => { layer.pendingIconSet = set })
  }

  // ─── Visibility pause (IntersectionObserver) ─────────────────────────────

  function initVisibilityPause() {
    observer = new IntersectionObserver(([entry]) => {
      const playState = entry.isIntersecting ? 'running' : 'paused'
      state.layers.forEach(l => { l.innerEl.style.animationPlayState = playState })
    }, { threshold: 0, rootMargin: '150px' })  // start 150px before entering view

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

/**
 * sceneConfig.js
 *
 * Centralized configuration for all 3D scenes in the portfolio.
 * Each scene (wave, experience, state) imports only what it needs.
 *
 * Future branches will add ExperienceConfig and StateConfig here.
 */

/* --------------------------
   Shared Color Palette
--------------------------- */
export const BASE_COLOR    = "#0099E5"; // helix blue — used by wave + experience
export const SURFACE_COLOR = "#E4E6E7"; // mesh gray  — used by state SVG

/* --------------------------
   Responsive Breakpoint
   Evaluated once at startup; geometry is allocated at module load time.
   Resize handler updates camera/renderer but does NOT rebuild geometry.
--------------------------- */
const IS_MOBILE = window.innerWidth < 768;

/* --------------------------
   Helix Length Helper
   Computes a world-space span that always extends ~2.5× the visible frustum
   width, ensuring XMB-style overflow at any viewport without sending an
   excess of off-screen particles to the GPU.

   Camera assumptions (wave.js): FOV 30, position (4, 2, 8), lookAt (0, 0, 0)
   Distance to origin ≈ √(4²+2²+8²) ≈ 9.17 units

   Results:
     1440×900  → ~19.7 units  (vs former hardcoded 22 — visually identical)
     375×667   →  ~6.9 units  (vs former 22 — appropriate density on mobile)
--------------------------- */
export function computeHelixLength() {
    const CAMERA_DIST   = Math.sqrt(4 * 4 + 2 * 2 + 8 * 8); // ≈ 9.17
    const FOV_HALF_RAD  = (30 * Math.PI / 180) / 2;
    const visibleHeight = 2 * Math.tan(FOV_HALF_RAD) * CAMERA_DIST; // ≈ 4.92 units
    const aspect        = window.innerWidth / window.innerHeight;
    return visibleHeight * aspect * 2.5;
}

/* --------------------------
   Wave (Helix) Config
   Used by js/wave.js
--------------------------- */
export const WaveConfig = {
    // Base color (hex) — passed to colorField.js createBaseHSL()
    COLOR: BASE_COLOR,

    // XMB diagonal tilt applied to the Points object
    ROTATION_X: 0.25,
    ROTATION_Z: 0.1,

    // Traversal speed: increasing LOOP_SECONDS slows the spiral orbit;
    // decreasing it speeds up. Derives WAVE_SPEED = (2π / LOOP_SECONDS) in wave.js.
    LOOP_SECONDS: 16,

    // Helix shape
    HELIX_RADIUS: 0.5, // orbital radius of each strand from the central axis
    HELIX_TWISTS: 6,   // number of full rotations along the length

    // Particle budget — allocated once at module load, not rebuilt on resize.
    // Mobile gets ~53% fewer particles to reduce CPU work in the position loop.
    STRAND_PARTICLES: IS_MOBILE ? 160 : 300, // per strand (×2 for both strands)
    RUNG_PARTICLES:   IS_MOBILE ? 160 : 300, // bridge particles between strands

    // Base point-size multiplier fed into the uPointSizeBase shader uniform.
    // Smaller on mobile reduces GPU fill rate without changing geometry.
    POINT_SIZE_BASE: IS_MOBILE ? 1.8 : 2.4,

    // --- Particle type appearance ----------------------------------------
    // Rungs (bridge particles):  blobby — soft, large, luminous bubbles
    RUNG_SIZE_MULT: 1.8,  // rungs rendered larger than POINT_SIZE_BASE
    RUNG_ALPHA:     0.75, // dense, high center opacity

    // Strands (helix spine):     sparkly — tight, precise glints
    STRAND_SIZE_MULT:  0.9,  // strands rendered slightly smaller than POINT_SIZE_BASE
    STRAND_ALPHA:      0.65, // lower base opacity for contrast against rungs
    STRAND_CORE_BOOST: 0.45, // 0–1: white-hot center spike intensity; 0 = no sparkle
    // --------------------------------------------------------------------
};

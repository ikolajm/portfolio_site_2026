/**
 * sceneConfig.js
 *
 * Centralized configuration for all 3D scenes in the portfolio.
 * Each scene (wave, experience, state) imports only what it needs.
 *
 * StateConfig will be added in a future branch.
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

--------------------------- */
export function computeHelixLength() {
    const CAMERA_DIST   = Math.sqrt(4 * 4 + 2 * 2 + 8 * 8);
    const FOV_HALF_RAD  = (30 * Math.PI / 180) / 2;
    const visibleHeight = 2 * Math.tan(FOV_HALF_RAD) * CAMERA_DIST;
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
    ROTATION_X: 0.15,
    ROTATION_Z: 0.15,

    // Traversal speed: increasing LOOP_SECONDS slows the spiral orbit;
    // decreasing it speeds up. Derives WAVE_SPEED = (2π / LOOP_SECONDS) in wave.js.
    LOOP_SECONDS: 64,

    // Helix shape
    HELIX_RADIUS: 0.5, // orbital radius of each strand from the central axis
    HELIX_TWISTS: 6,   // number of full rotations along the length

    // Particle budget — allocated once at module load, not rebuilt on resize.
    // Mobile gets ~53% fewer particles to reduce CPU work in the position loop.
    STRAND_PARTICLES: IS_MOBILE ? 160 : 400, // per strand (×2 for both strands)
    RUNG_PARTICLES:   IS_MOBILE ? 80 : 200, // bridge particles between strands

    // Base point-size multiplier fed into the uPointSizeBase shader uniform.
    // Smaller on mobile reduces GPU fill rate without changing geometry.
    POINT_SIZE_BASE: IS_MOBILE ? 1.25 : 1.5,

    // --- Particle type appearance ----------------------------------------
    // Rungs (bridge particles):  blobby — soft, large, luminous bubbles
    RUNG_SIZE_MULT: .5,  // rungs rendered larger than POINT_SIZE_BASE
    RUNG_ALPHA:     0.2, // dense, high center opacity

    // Strands (helix spine):     sparkly — tight, precise glints
    STRAND_SIZE_MULT: 2,    // strands rendered slightly smaller than POINT_SIZE_BASE
    STRAND_ALPHA:     0.8, // lower base opacity for contrast against rungs

    // Orb core — universal bright center applied to all particle types.
    // Wave orbs are prominent: large viewport, user is up-close.
    ORB_CORE_RADIUS:   0.20, // controls the radius of the white-hot center zone
    ORB_CORE_STRENGTH: 0.20, // controls how strongly the center bleeds to white
    // --------------------------------------------------------------------
};

/* --------------------------
   Experience (Particle Logos) Config
   Used by js/experience.js
--------------------------- */
export const ExperienceConfig = {
    COLOR: BASE_COLOR,

    // Particle budget — allocated once at startup, not rebuilt on resize.
    // Sparse enough for individual blobs to be distinct; dense enough to read as logos.
    MAX_PARTICLES: 3000,

    // Point size tuned for the experience camera setup.
    POINT_SIZE_BASE: 10.0,

    // All logo particles are blobby (aType = 1.0 everywhere).
    // Logo shapes need soft, luminous blobs for readability — no sparkle spikes.
    RUNG_SIZE_MULT:   2.0,  // larger than base — luminous soft bubble
    RUNG_ALPHA:       0.20, // high center opacity for blob fill

    // Drifter particles (aType = 0.0): medium orbital glows forming the liquid halo
    // These values ARE active — drifters use the strand path in the shared shader
    STRAND_SIZE_MULT: 1.25, // medium size for the orbital halo cloud
    STRAND_ALPHA:     0.25, // softer, atmospheric — lighter than anchors

    // Orb core — universal bright center applied to all particle types.
    // Experience orbs are slightly dimmer / more distant-feeling than wave orbs
    // (conveyed through opacity and core intensity, not actual z position).
    ORB_CORE_RADIUS:   0.18, // controls the radius of the white-hot center zone
    ORB_CORE_STRENGTH: 0.20, // controls how strongly the center bleeds to white

    // --- Per-particle jitter distribution --------------------------------
    // Creates the "liquified orb entity" feel through internal population layering.
    // Anchors stay tight to the logo shape; drifters orbit outward forming the halo.
    // All drift is scaled by jitterStrength (0 during morph, 1 at idle) so
    // morph transitions remain clean regardless of per-particle amplitude.
    IDLE_JITTER:       7.5,  // base world-space drift amplitude
    ANCHOR_RATIO:      0.95, // fraction of particles tightly anchored to the logo shape
    ANCHOR_JITTER_MAX: 0.40, // max drift multiplier for anchors; keep low to preserve shape readability
    DRIFT_JITTER_MIN:  1.0,  // minimum drift multiplier for halo drifters
    DRIFT_JITTER_MAX:  2.0,  // increase to widen halo; decrease to tighten it

    // Orbital pathing for drifter particles — smooth circular arcs per orb.
    // One full orbit period = 2π / orbitSpeed; higher values = tighter/faster arcs.
    // Anchors (jAmp ≈ 0) orbit with near-zero radius regardless of speed.
    ORBIT_SPEED_MIN: 0.20, // rad/s — lower bound for orbit angular velocity
    ORBIT_SPEED_MAX: 0.60, // rad/s — upper bound for orbit angular velocity
    // --------------------------------------------------------------------
};

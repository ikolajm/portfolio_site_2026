/**
 * particleShader.js
 *
 * Shared vertex + fragment shaders for the helix particle system.
 * Used by wave.js now; will be imported by experience.js in a future branch.
 *
 * Vertex shader:  depth-aware point sizing, per-particle type blending
 * Fragment shader: soft circular falloff with optional sparkle core for strand particles
 */

/* --------------------------
   Vertex Shader
   - aType:  0.0 = strand particle, 1.0 = rung/bridge particle
   - Uniforms drive size scaling per particle type
--------------------------- */
export const particleVertexShader = `
    attribute vec3  color;
    attribute float aType;        // 0.0 = strand particle, 1.0 = rung/bridge particle

    varying vec3  vColor;
    varying float vType;

    uniform float uPointSizeBase;   // base size multiplier (desktop vs mobile via config)
    uniform float uRungSizeMult;    // rungs are blobby — larger than base
    uniform float uStrandSizeMult;  // strands are tight — slightly smaller than base
    uniform float uPixelRatio;      // renderer pixel ratio — compensates for HiDPI drawing buffers

    void main() {
        vColor = color;
        vType  = aType;

        vec4  mvPosition = modelViewMatrix * vec4(position, 1.0);
        float sizeMult   = mix(uStrandSizeMult, uRungSizeMult, aType);

        // Depth-aware sizing: particles closer to camera appear larger.
        // Multiplied by uPixelRatio so gl_PointSize (in physical drawing-buffer pixels)
        // maps to consistent CSS pixels across 1×/2× DPR devices.
        gl_PointSize = max(1.0, uPointSizeBase * sizeMult * (280.0 / -mvPosition.z) * uPixelRatio);
        gl_Position  = projectionMatrix * mvPosition;
    }
`;

/* --------------------------
   Fragment Shader
   - Rungs  (vType = 1.0): dense, high-opacity luminous sphere
   - Strands (vType = 0.0): lower-opacity sphere with the same bright core
   - uCoreRadius:   0–0.5 fraction of point radius that becomes white-hot
   - uCoreStrength: 0–1 how fully the center bleaches toward white
   All particle types share the same "white-hot core → colored body → soft halo"
   layering. Orbs remain visually distinct until their centers collide (additive blending).
--------------------------- */
export const particleFragmentShader = `
    varying vec3  vColor;
    varying float vType;

    uniform float uRungAlpha;     // center opacity for rung/anchor blobs
    uniform float uStrandAlpha;   // center opacity for strand/drifter orbs
    uniform float uCoreRadius;    // 0–0.5: fraction of point radius that is white-hot center
    uniform float uCoreStrength;  // 0–1: how fully the center bleaches to white

    void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        // Outer soft body — opacity blends between strand and rung modes
        float baseAlpha = mix(uStrandAlpha, uRungAlpha, vType);
        float body      = (1.0 - smoothstep(0.0, 0.5, dist)) * baseAlpha;

        // Bright inner core — luminous sphere center, universal across all particle types
        float core = 1.0 - smoothstep(0.0, uCoreRadius, dist);

        // White-hot at center → particle color at body → transparent at edge
        vec3 finalColor = mix(vColor, vec3(1.0), core * uCoreStrength);

        // Core adds full presence at center; body provides the soft outer glow
        float alpha = clamp(body + core * 0.45, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha);
    }
`;

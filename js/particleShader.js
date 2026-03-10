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

    void main() {
        vColor = color;
        vType  = aType;

        vec4  mvPosition = modelViewMatrix * vec4(position, 1.0);
        float sizeMult   = mix(uStrandSizeMult, uRungSizeMult, aType);

        // Depth-aware sizing: particles closer to camera appear larger
        gl_PointSize = max(1.0, uPointSizeBase * sizeMult * (280.0 / -mvPosition.z));
        gl_Position  = projectionMatrix * mvPosition;
    }
`;

/* --------------------------
   Fragment Shader
   - Rungs  (vType = 1.0): dense, high-opacity soft blob
   - Strands (vType = 0.0): lower-opacity with bright white-hot center spike (sparkle)
   - uStrandCoreBoost controls sparkle intensity; set to 0 to disable
--------------------------- */
export const particleFragmentShader = `
    varying vec3  vColor;
    varying float vType;

    uniform float uRungAlpha;        // center opacity for rung blobs   (e.g. 0.95)
    uniform float uStrandAlpha;      // center opacity for strand sparks (e.g. 0.65)
    uniform float uStrandCoreBoost;  // 0–1: brightness of white-hot spike at strand center

    void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        // Blend opacity target between strand and rung modes
        float baseAlpha = mix(uStrandAlpha, uRungAlpha, vType);
        float alpha     = (1.0 - smoothstep(0.0, 0.5, dist)) * baseAlpha;

        // Sparkle core: white-hot spike at the center of strand particles only
        // Ramp falls off quickly (smoothstep 0→0.15) so it stays a tight highlight
        float core      = (1.0 - vType) * uStrandCoreBoost
                          * (1.0 - smoothstep(0.0, 0.15, dist));
        vec3 finalColor = clamp(vColor + vec3(core), 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha);
    }
`;

import * as THREE from "three";

/* ----------------------------------
   Shared Color Field Configuration
----------------------------------- */
export const ColorFieldConfig = {
  CYCLE_SECONDS: 8,
  LIGHTNESS_VARIATION_RANGE: 0.1,
  MAX_LIGHTNESS_SHIFT: 0.025,
  MAX_HUE_SHIFT: 0.025,
  PHASE_X_SCALE: 0.25,
  PHASE_Y_SCALE: 0.25,
  COLOR_UPDATE_INTERVAL: 0.05
};

/* ----------------------------------
   Create Base HSL From Hex
----------------------------------- */
export function createBaseHSL(hex) {
  const color = new THREE.Color(hex);
  const hsl = {};
  color.getHSL(hsl);
  return hsl;
}

/* ----------------------------------
   Generate Static Lightness Offsets
----------------------------------- */
export function createLightnessOffsets(count, range) {
  const offsets = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    offsets[i] = (Math.random() - 0.5) * range;
  }
  return offsets;
}

/* ----------------------------------
   Wave-Matched Color Field Function
----------------------------------- */
const tempColor = new THREE.Color();
export function applyColorField({
  positions,
  colors,
  baseHSL,
  lightnessOffsets,
  time,
  config = ColorFieldConfig
}) {
  const {
    CYCLE_SECONDS,
    MAX_LIGHTNESS_SHIFT,
    MAX_HUE_SHIFT,
    PHASE_X_SCALE,
    PHASE_Y_SCALE
  } = config;

  const timeFreq =
    (time / CYCLE_SECONDS) * Math.PI * 2;

  for (let i = 0; i < positions.length; i += 3) {
    const idx = i / 3;

    const px = positions[i];
    const py = positions[i + 1];

    const phase =
      px * PHASE_X_SCALE +
      py * PHASE_Y_SCALE;

    const sine = Math.sin(timeFreq + phase);

    const hue =
      (baseHSL.h + sine * MAX_HUE_SHIFT + 1) % 1;

    const lightness = THREE.MathUtils.clamp(
      baseHSL.l +
      lightnessOffsets[idx] +
      sine * MAX_LIGHTNESS_SHIFT,
      0,
      1
    );

    tempColor.setHSL(
      hue,
      baseHSL.s,
      lightness
    );

    colors[i]     = tempColor.r;
    colors[i + 1] = tempColor.g;
    colors[i + 2] = tempColor.b;
  }
}
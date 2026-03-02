import * as THREE from "three";

export const OrbConfig = {
    AFTERIMAGE_THRESHOLD: .8,
    BLOOM_STRENGTH: .15,
    BLOOM_RADIUS: .15,
    BLOOM_THRESHOLD: .2,
}

export function createOrbTexture(size = 64) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
    );
    gradient.addColorStop(0.0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.25)");
    gradient.addColorStop(1.0, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
}
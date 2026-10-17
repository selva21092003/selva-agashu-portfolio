"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type ThreeDevSceneProps = {
  className?: string;
  /** Called when WebGL is unavailable so the caller can render a fallback. */
  onUnsupported?: () => void;
};

/* ----------------------------------------------------------------- palette */

const C = {
  skin: 0xf3bd93,
  hair: 0x2f2018,
  hoodie: 0x3f62e0,
  hoodieDark: 0x2b3f9e,
  wood: 0xba8253,
  woodDark: 0x8a5c37,
  metal: 0xcfd6df,
  metalDark: 0xa8b2bf,
  violet: 0x8b5cf6,
  violetSoft: 0xb49bff,
  pot: 0xf1f4f9,
  potShade: 0xd8dee8,
  leaf: 0x3fae63,
  leafDark: 0x2b8b4c,
  bookA: 0xef5350,
  bookB: 0x4a7de0,
  bookC: 0xf2b13c,
  mug: 0x1f2733,
  chair: 0x3a4573,
};

/* ----------------------------------------------------------------- helpers */

type StdOpts = Partial<THREE.MeshStandardMaterialParameters>;

function std(color: number, opts: StdOpts = {}) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.68,
    metalness: 0.04,
    ...opts,
  });
}

/** Rounded box with the corner radius clamped to a legal value. */
function rbox(w: number, h: number, d: number, radius = 0.08, segments = 3) {
  const r = Math.max(0.001, Math.min(radius, Math.min(w, h, d) / 2 - 0.001));
  return new RoundedBoxGeometry(w, h, d, segments, r);
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function canvasTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D) => void
) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Backdrop: violet gradient with a soft glow behind the character. */
function backdropTexture() {
  return canvasTexture(768, 960, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 960);
    g.addColorStop(0, "#311e63");
    g.addColorStop(0.45, "#211341");
    g.addColorStop(1, "#120b24");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 768, 960);

    const glow = ctx.createRadialGradient(384, 420, 20, 384, 420, 560);
    glow.addColorStop(0, "rgba(139,92,246,0.60)");
    glow.addColorStop(0.5, "rgba(109,40,217,0.18)");
    glow.addColorStop(1, "rgba(109,40,217,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 768, 960);
  });
}

/**
 * Face painted onto the sphere's equirectangular UVs.
 * u = 0.25 faces +Z (towards the camera), v = 0.5 is the equator.
 */
function faceTexture() {
  return canvasTexture(1024, 512, (ctx) => {
    ctx.fillStyle = "#f3bd93";
    ctx.fillRect(0, 0, 1024, 512);

    const cx = 1024 * 0.25;
    const cy = 512 * 0.5;

    ctx.lineCap = "round";

    // cheeks
    ctx.fillStyle = "rgba(238,124,110,0.26)";
    for (const dx of [-100, 100]) {
      ctx.beginPath();
      ctx.ellipse(cx + dx, cy + 40, 40, 24, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // brows — thick and slightly arched
    ctx.strokeStyle = "#2a1a12";
    ctx.lineWidth = 14;
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(cx + s * 92, cy - 50);
      ctx.quadraticCurveTo(cx + s * 60, cy - 72, cx + s * 22, cy - 56);
      ctx.stroke();
    }

    // eyes — white sclera, brown iris, pupil, two highlights
    for (const s of [-1, 1]) {
      const ex = cx + s * 56;
      const ey = cy - 8;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(ex, ey, 31, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#5a3417";
      ctx.beginPath();
      ctx.ellipse(ex + 3, ey + 3, 22, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1a0f09";
      ctx.beginPath();
      ctx.ellipse(ex + 3, ey + 4, 12, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(ex + 12, ey - 7, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex - 6, ey + 12, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // upper lid line
      ctx.strokeStyle = "#2a1a12";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.ellipse(ex, ey, 32, 36, 0, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    }

    // nose
    ctx.strokeStyle = "#d48f63";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy + 22);
    ctx.quadraticCurveTo(cx + 12, cy + 36, cx - 4, cy + 40);
    ctx.stroke();

    // open smile with teeth
    ctx.fillStyle = "#7a2e22";
    ctx.beginPath();
    ctx.moveTo(cx - 38, cy + 56);
    ctx.quadraticCurveTo(cx, cy + 66, cx + 38, cy + 56);
    ctx.quadraticCurveTo(cx, cy + 104, cx - 38, cy + 56);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(cx - 32, cy + 59);
    ctx.quadraticCurveTo(cx, cy + 67, cx + 32, cy + 59);
    ctx.quadraticCurveTo(cx, cy + 75, cx - 32, cy + 59);
    ctx.fill();
  });
}

/** Laptop deck: keys plus a trackpad. */
function keyboardTexture() {
  return canvasTexture(512, 320, (ctx) => {
    ctx.fillStyle = "#1b2130";
    ctx.fillRect(0, 0, 512, 320);

    const cols = 14;
    const rows = 5;
    const padX = 24;
    const gap = 6;
    const keyW = (512 - padX * 2 - gap * (cols - 1)) / cols;
    const keyH = 30;

    ctx.fillStyle = "#2c3447";
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        roundRectPath(ctx, padX + c * (keyW + gap), 22 + r * (keyH + gap), keyW, keyH, 5);
        ctx.fill();
      }
    }

    ctx.fillStyle = "#242c3d";
    roundRectPath(ctx, 512 / 2 - 72, 22 + rows * (keyH + gap) + 8, 144, 58, 9);
    ctx.fill();
  });
}

/** Font size that fits `text` inside `maxWidth`, capped at `size`. */
function fitFont(ctx: CanvasRenderingContext2D, text: string, size: number, maxWidth: number, family: string) {
  ctx.font = `bold ${size}px ${family}`;
  const w = ctx.measureText(text).width;
  const fitted = w > maxWidth ? Math.floor((size * maxWidth) / w) : size;
  ctx.font = `bold ${fitted}px ${family}`;
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SANS = "ui-sans-serif, system-ui, 'Segoe UI', Roboto, sans-serif";

/** White glyph on transparent background, for the floating code tiles. */
function glyphTexture(text: string, color = "#ffffff") {
  return canvasTexture(256, 256, (ctx) => {
    ctx.clearRect(0, 0, 256, 256);
    ctx.fillStyle = color;
    // Measure first: multi-character glyphs overflow the tile at a fixed size.
    fitFont(ctx, text, 150, 196, MONO);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 134);
  });
}

/** Dark editor window with syntax-coloured lines. */
function codeWindowTexture() {
  return canvasTexture(640, 460, (ctx) => {
    ctx.fillStyle = "#151a2c";
    ctx.fillRect(0, 0, 640, 460);

    // title bar
    ctx.fillStyle = "#1f2540";
    ctx.fillRect(0, 0, 640, 54);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(34 + i * 30, 27, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // code lines: [indent, [width, colour]...]
    const lines: [number, [number, string][]][] = [
      [0, [[70, "#c084fc"], [120, "#60a5fa"], [40, "#e2e8f0"]]],
      [1, [[60, "#c084fc"], [90, "#fbbf24"], [110, "#34d399"]]],
      [1, [[150, "#60a5fa"], [70, "#e2e8f0"]]],
      [2, [[90, "#f472b6"], [130, "#fbbf24"]]],
      [2, [[60, "#c084fc"], [160, "#34d399"]]],
      [1, [[40, "#e2e8f0"]]],
      [1, [[80, "#c084fc"], [100, "#60a5fa"], [60, "#fb923c"]]],
      [2, [[140, "#34d399"], [50, "#e2e8f0"]]],
      [0, [[30, "#e2e8f0"]]],
    ];
    lines.forEach(([indent, segs], row) => {
      let x = 34 + indent * 38;
      const y = 82 + row * 40;
      for (const [w, c] of segs) {
        ctx.fillStyle = c;
        roundRectPath(ctx, x, y, w, 16, 8);
        ctx.fill();
        x += w + 14;
      }
    });
  });
}

/** Book spine: solid colour with a centred label. */
function spineTexture(label: string, bg: string, fg = "#ffffff") {
  return canvasTexture(512, 96, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 96);
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillRect(0, 10, 512, 5);
    ctx.fillRect(0, 81, 512, 5);
    ctx.fillStyle = fg;
    fitFont(ctx, label, 56, 440, SANS);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 256, 51);
  });
}

/* ------------------------------------------------------------- build parts */

function makeDesk(group: THREE.Group, cast: THREE.Mesh[], receive: THREE.Mesh[]) {
  const top = new THREE.Mesh(
    rbox(6.6, 0.34, 4, 0.07, 3),
    std(C.wood, { roughness: 0.72 })
  );
  top.position.set(0, -0.17, 0.4);
  top.receiveShadow = true;
  top.castShadow = true;
  group.add(top);
  receive.push(top);

  const apron = new THREE.Mesh(
    rbox(6.6, 0.5, 3.4, 0.05, 2),
    std(C.woodDark, { roughness: 0.8 })
  );
  apron.position.set(0, -0.55, 0.4);
  group.add(apron);
}

function makeLaptop(group: THREE.Group, cast: THREE.Mesh[]) {
  const shell = std(C.metal, { roughness: 0.38, metalness: 0.08 });

  const base = new THREE.Mesh(rbox(1.95, 0.14, 1.45, 0.055, 3), shell);
  base.position.set(0, 0.07, 0.9);
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);
  cast.push(base);

  const deck = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 1.14),
    std(0xffffff, { map: keyboardTexture(), roughness: 0.55 })
  );
  deck.rotation.x = -Math.PI / 2;
  deck.position.set(0, 0.142, 0.91);
  group.add(deck);

  // Lid — hinged at the edge nearest the camera so we see its back, as
  // if looking across the desk at the developer.
  const pivot = new THREE.Group();
  pivot.position.set(0, 0.14, 1.58);
  pivot.rotation.x = 0.34;
  group.add(pivot);

  const lid = new THREE.Mesh(rbox(1.95, 1.2, 0.1, 0.05, 3), shell);
  lid.position.set(0, 0.6, 0);
  lid.castShadow = true;
  pivot.add(lid);
  cast.push(lid);

  const logo = new THREE.Mesh(
    new THREE.RingGeometry(0.07, 0.12, 32),
    std(C.metalDark, { roughness: 0.5, metalness: 0.3 })
  );
  logo.position.set(0, 0.6, 0.052);
  pivot.add(logo);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.78, 1.05),
    new THREE.MeshStandardMaterial({
      color: 0x121836,
      emissive: new THREE.Color(0x4a6bff),
      emissiveIntensity: 0.85,
      roughness: 0.3,
    })
  );
  screen.position.set(0, 0.6, -0.052);
  screen.rotation.y = Math.PI;
  pivot.add(screen);

  const glow = new THREE.PointLight(0x7f9bff, 5, 3.2, 2);
  glow.position.set(0, 1.1, 0.9);
  group.add(glow);
}

function makeCharacter(group: THREE.Group, cast: THREE.Mesh[]) {
  const hoodieMat = std(C.hoodie, { roughness: 0.78 });
  const skinMat = std(C.skin, { roughness: 0.62 });
  const armMat = std(0x3757cf, { roughness: 0.78 });

  // chair back, so the figure reads as seated rather than floating
  const chair = new THREE.Mesh(rbox(1.6, 2, 0.22, 0.1, 4), std(C.chair, { roughness: 0.85 }));
  chair.position.set(0, 1.3, -1.22);
  chair.castShadow = true;
  group.add(chair);

  // torso
  const torso = new THREE.Mesh(rbox(1.42, 1.45, 0.92, 0.32, 4), hoodieMat);
  torso.position.set(0, 1.06, -0.55);
  torso.castShadow = true;
  torso.receiveShadow = true;
  group.add(torso);
  cast.push(torso);

  // hood bunched behind the neck
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.58, 28, 20), std(C.hoodieDark, { roughness: 0.8 }));
  hood.position.set(0, 1.86, -0.86);
  hood.scale.set(1.1, 0.8, 0.88);
  hood.castShadow = true;
  group.add(hood);
  cast.push(hood);

  // hoodie drawstrings
  for (const sx of [-1, 1]) {
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8),
      std(0xe8ecf6, { roughness: 0.6 })
    );
    cord.position.set(sx * 0.17, 1.5, -0.08);
    cord.rotation.x = 0.12;
    group.add(cord);
  }

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.4, 20), skinMat);
  neck.position.set(0, 1.95, -0.5);
  group.add(neck);

  // head — face is painted into the sphere's UVs
  const headMat = new THREE.MeshStandardMaterial({
    map: faceTexture(),
    roughness: 0.62,
  });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.78, 64, 44), headMat);
  head.position.set(0, 2.55, -0.45);
  head.scale.set(1, 1.04, 0.96);
  head.castShadow = true;
  group.add(head);
  cast.push(head);

  for (const sx of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 16), skinMat);
    ear.position.set(sx * 0.75, 2.52, -0.45);
    ear.scale.set(0.75, 1, 0.8);
    group.add(ear);
  }

  // hair — a skull cap tilted back to leave the forehead clear, curly
  // lumps on top for volume, and a swept fringe over the brow
  const hairMat = std(C.hair, { roughness: 0.82 });
  const hc = head.position;
  const addHair = (mesh: THREE.Mesh) => {
    mesh.castShadow = true;
    group.add(mesh);
    cast.push(mesh);
  };

  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.815, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.5),
    hairMat
  );
  cap.position.copy(hc);
  cap.rotation.x = -0.5;
  cap.scale.set(1.03, 1.04, 1.05);
  addHair(cap);

  /** Point on the head at azimuth `az` (0 = facing camera) and elevation `el`. */
  const onHead = (az: number, el: number, r: number) =>
    new THREE.Vector3(
      Math.sin(az) * Math.cos(el),
      Math.sin(el),
      Math.cos(az) * Math.cos(el)
    )
      .multiplyScalar(r)
      .add(hc);

  // curls: az, el, radius
  const curls: [number, number, number][] = [
    [0, 1.45, 0.34],
    [0.75, 1.15, 0.3],
    [-0.75, 1.15, 0.3],
    [1.6, 0.95, 0.28],
    [-1.6, 0.95, 0.28],
    [2.4, 0.85, 0.3],
    [-2.4, 0.85, 0.3],
    [Math.PI, 0.9, 0.32],
    [0.35, 0.95, 0.27],
    [-0.4, 0.98, 0.27],
    [1.15, 0.6, 0.24],
    [-1.15, 0.6, 0.24],
    [2.0, 0.4, 0.26],
    [-2.0, 0.4, 0.26],
    [2.8, 0.35, 0.28],
    [-2.8, 0.35, 0.28],
  ];
  curls.forEach(([az, el, r], i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), hairMat);
    m.position.copy(onHead(az, el, 0.8));
    m.scale.set(1.1, 0.92 + (i % 3) * 0.06, 0.72);
    m.lookAt(hc);
    addHair(m);
  });

  // fringe locks lying on the forehead: az, el, length, sweep angle
  const locks: [number, number, number, number][] = [
    [-0.42, 0.62, 0.36, 0.9],
    [-0.12, 0.66, 0.4, 0.75],
    [0.2, 0.64, 0.38, 0.6],
    [0.5, 0.58, 0.32, 0.45],
  ];
  for (const [az, el, len, sweep] of locks) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), hairMat);
    m.position.copy(onHead(az, el, 0.8));
    m.lookAt(hc);
    m.rotateZ(sweep);
    m.scale.set(0.15, len * 0.6, 0.1);
    addHair(m);
  }

  // arms reaching down past the laptop to the desk
  const shoulderL = new THREE.Vector3(-0.5, 1.42, -0.35);
  const handL = new THREE.Vector3(-1, 0.19, 0.72);
  const shoulderR = new THREE.Vector3(0.5, 1.42, -0.35);
  const handR = new THREE.Vector3(1, 0.19, 0.72);

  const capsuleBetween = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    radius: number,
    mat: THREE.Material
  ) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const geo = new THREE.CapsuleGeometry(radius, Math.max(len - radius * 2, 0.02), 6, 20);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.castShadow = true;
    return mesh;
  };

  group.add(capsuleBetween(shoulderL, handL, 0.15, armMat));
  group.add(capsuleBetween(shoulderR, handR, 0.15, armMat));

  for (const hand of [handL, handR]) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.155, 22, 18), skinMat);
    m.position.copy(hand);
    m.scale.set(1.15, 0.8, 1.3);
    m.castShadow = true;
    group.add(m);
  }
}

function makePlant(group: THREE.Group, cast: THREE.Mesh[]) {
  const x = -1.95;
  const z = 0.76;

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.26, 0.58, 28),
    std(C.pot, { roughness: 0.5 })
  );
  pot.position.set(x, 0.29, z);
  pot.castShadow = true;
  pot.receiveShadow = true;
  group.add(pot);
  cast.push(pot);

  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.375, 0.375, 0.1, 28),
    std(C.potShade, { roughness: 0.5 })
  );
  rim.position.set(x, 0.57, z);
  rim.castShadow = true;
  group.add(rim);
  cast.push(rim);

  const leafMats = [std(C.leaf, { roughness: 0.45 }), std(C.leafDark, { roughness: 0.5 })];
  const leaves: [number, number, number, number][] = [
    // xOff, yOff, zOff, rotationZ
    [0, 0.52, 0, -0.45],
    [0.1, 0.62, 0.02, 0.0],
    [-0.12, 0.5, -0.04, 0.42],
    [0.22, 0.36, 0.08, 0.85],
    [-0.26, 0.34, -0.08, -0.85],
  ];
  leaves.forEach(([ox, oy, oz, rz], i) => {
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 14),
      leafMats[i % 2]
    );
    leaf.position.set(x + ox, 0.6 + oy, z + oz);
    leaf.scale.set(0.42, 1.3, 0.16);
    leaf.rotation.z = rz;
    leaf.rotation.y = rz * 0.5;
    leaf.castShadow = true;
    group.add(leaf);
    cast.push(leaf);
  });
}

function makeBooks(group: THREE.Group, cast: THREE.Mesh[]) {
  const x = 1.72;
  const z = 0.34;
  const stack: [number, number, number, string, string][] = [
    // y, width, rotationY, label, spine colour
    [0.09, 1.04, 0.08, "React", "#3b82f6"],
    [0.27, 0.96, -0.1, "JS", "#f2b13c"],
    [0.45, 1, 0.05, "CSS", "#7c5cf0"],
    [0.63, 0.92, -0.06, "HTML", "#ef5350"],
  ];
  for (const [y, w, ry, label, color] of stack) {
    const b = new THREE.Mesh(
      rbox(w, 0.17, 0.78, 0.03, 2),
      std(new THREE.Color(color).getHex(), { roughness: 0.62 })
    );
    b.position.set(x, y, z);
    b.rotation.y = ry;
    b.castShadow = true;
    b.receiveShadow = true;

    const spine = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.04, 0.15),
      std(0xffffff, { map: spineTexture(label, color), roughness: 0.6 })
    );
    spine.position.z = 0.392;
    b.add(spine);

    group.add(b);
    cast.push(b);
  }
}

function makeMug(group: THREE.Group, cast: THREE.Mesh[]) {
  const x = 1.58;
  const z = 1.2;

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.175, 0.46, 28),
    std(C.mug, { roughness: 0.42 })
  );
  body.position.set(x, 0.23, z);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);
  cast.push(body);

  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.032, 10, 22, Math.PI * 1.35),
    std(C.mug, { roughness: 0.42 })
  );
  handle.position.set(x + 0.19, 0.26, z);
  handle.rotation.z = -Math.PI / 2.4;
  group.add(handle);

  const brew = new THREE.Mesh(
    new THREE.CircleGeometry(0.18, 24),
    std(0x6b4326, { roughness: 0.3 })
  );
  brew.rotation.x = -Math.PI / 2;
  brew.position.set(x, 0.455, z);
  group.add(brew);

  // "</>" print wrapped around the front of the mug
  const print = new THREE.Mesh(
    new THREE.CylinderGeometry(0.193, 0.185, 0.22, 24, 1, true, -0.75, 1.5),
    new THREE.MeshStandardMaterial({
      map: glyphTexture("</>"),
      transparent: true,
      roughness: 0.42,
    })
  );
  print.position.set(x, 0.24, z);
  group.add(print);
}

function makeCodeWindow(group: THREE.Group) {
  const win = new THREE.Group();
  win.position.set(-1.62, 3.05, 0.1);
  win.rotation.set(-0.04, 0.32, 0.02);

  const frame = new THREE.Mesh(
    rbox(1.5, 1.08, 0.08, 0.06, 3),
    std(0x1f2540, { roughness: 0.5 })
  );
  win.add(frame);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.42, 1.0),
    new THREE.MeshBasicMaterial({ map: codeWindowTexture(), toneMapped: false })
  );
  screen.position.z = 0.042;
  win.add(screen);

  group.add(win);
  return { mesh: win, phase: 0.6, baseY: win.position.y };
}

function makeFloatingTiles(group: THREE.Group, cast: THREE.Mesh[]) {
  const specs: [number, number, number, string, number][] = [
    // x, y, z, glyph, scale
    [1.55, 3.45, 0.2, "{}", 0.85],
    [2.05, 2.45, 0.4, "</>", 0.85],
    [-0.98, 2.42, 0.75, "{}", 0.6],
  ];

  const tiles: { mesh: THREE.Group; phase: number; baseY: number }[] = [];

  specs.forEach(([x, y, z, glyph, scale], i) => {
    const tile = new THREE.Group();
    tile.position.set(x, y, z);
    tile.rotation.set(-0.1, i === 1 ? -0.3 : 0.28, i === 2 ? -0.14 : 0.1);

    const body = new THREE.Mesh(
      rbox(0.78, 0.78, 0.16, 0.12, 4),
      std(C.violet, { roughness: 0.35, metalness: 0.15 })
    );
    body.castShadow = true;
    tile.add(body);
    cast.push(body);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.62),
      new THREE.MeshBasicMaterial({
        map: glyphTexture(glyph),
        transparent: true,
        toneMapped: false,
      })
    );
    face.position.z = 0.085;
    tile.add(face);

    tile.scale.setScalar(scale);
    group.add(tile);
    tiles.push({ mesh: tile, phase: i * 1.7, baseY: y });
  });

  const specks: [number, number, number, number][] = [
    [-1.25, 3.82, 0.2, 0.09],
    [1.22, 3.66, 0.1, 0.07],
    [2.0, 2.45, 0.6, 0.06],
    [-2.02, 1.5, 0.5, 0.05],
    [0.4, 3.98, -0.3, 0.055],
  ];
  for (const [x, y, z, r] of specks) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(r, 16, 12),
      std(C.violetSoft, { roughness: 0.3, metalness: 0.2 })
    );
    s.position.set(x, y, z);
    group.add(s);
  }

  return tiles;
}

/* --------------------------------------------------------------- component */

export function ThreeDevScene({ className, onUnsupported }: ThreeDevSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      onUnsupported?.();
      return;
    }
    if (!renderer.getContext()) {
      onUnsupported?.();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.display = "block";
    // setSize(..., false) leaves CSS size alone, so pin it here — otherwise
    // the canvas shows at devicePixelRatio× its box and gets cropped.
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgTex = backdropTexture();
    scene.background = bgTex;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const baseCamPos = new THREE.Vector3(0, 3.3, 9.9);
    const lookAt = new THREE.Vector3(0, 1.9, 0);
    camera.position.copy(baseCamPos);
    camera.lookAt(lookAt);

    /* ------------------------------------------------------------- lights */

    scene.add(new THREE.HemisphereLight(0xc9b6ff, 0x241238, 1.5));

    const key = new THREE.DirectionalLight(0xfff2df, 2.6);
    key.position.set(5.5, 9, 6.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -3;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 3;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8b5cf6, 1.3);
    fill.position.set(-6, 3, 5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x74a4ff, 1.4);
    rim.position.set(-1.5, 4.5, -8);
    scene.add(rim);

    /* -------------------------------------------------------------- world */

    const world = new THREE.Group();
    scene.add(world);

    const cast: THREE.Mesh[] = [];
    const receive: THREE.Mesh[] = [];

    makeDesk(world, cast, receive);
    makeCharacter(world, cast);
    makeLaptop(world, cast);
    makePlant(world, cast);
    makeBooks(world, cast);
    makeMug(world, cast);
    const tiles = makeFloatingTiles(world, cast);
    tiles.push(makeCodeWindow(world));

    /* ---------------------------------------------------------- animation */

    const pointer = new THREE.Vector2();
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onPointerLeave = () => pointer.set(0, 0);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    let running = false;
    let raf = 0;
    let last = 0;
    let elapsed = 0;

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      elapsed += Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = elapsed;

      if (!reduceMotion) {
        world.rotation.y = Math.sin(t * 0.22) * 0.16;
        world.position.y = Math.sin(t * 0.7) * 0.035;

        for (const tile of tiles) {
          tile.mesh.position.y = tile.baseY + Math.sin(t * 0.9 + tile.phase) * 0.12;
          tile.mesh.rotation.z = Math.sin(t * 0.5 + tile.phase) * 0.08;
        }
      }

      const goalX = baseCamPos.x + pointer.x * 0.55;
      const goalY = baseCamPos.y - pointer.y * 0.32;
      camera.position.x += (goalX - camera.position.x) * 0.045;
      camera.position.y += (goalY - camera.position.y) * 0.045;
      camera.lookAt(lookAt);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ------------------------------------------------------------ cleanup */

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) (mat as THREE.Material).dispose();
      });
      bgTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onUnsupported]);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="3D illustration of a developer working at a desk"
    />
  );
}

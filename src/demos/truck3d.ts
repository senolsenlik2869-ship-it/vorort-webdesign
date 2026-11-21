import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Selbst modellierter Sattelzug für die Konzept-Demo „Muster Transporte“.
 * Keine echten Marken, keine Kennzeichen – die Folierung zeigt nur das fiktive Logo.
 */

const AMBER = 0xf5a524;

function sideLivery() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 512;
  const g = c.getContext("2d")!;
  const bg = g.createLinearGradient(0, 0, 2048, 0);
  bg.addColorStop(0, "#e9e7e2");
  bg.addColorStop(1, "#f6f5f2");
  g.fillStyle = bg;
  g.fillRect(0, 0, 2048, 512);
  // Bernstein-Streifen unten
  g.fillStyle = "#f5a524";
  g.fillRect(0, 430, 2048, 34);
  g.fillStyle = "#16181d";
  g.fillRect(0, 464, 2048, 48);
  // Logo-Zeichen
  const x = 120,
    y = 120,
    s = 220;
  g.fillStyle = "#f5a524";
  g.beginPath();
  g.roundRect(x, y, s, s, 60);
  g.fill();
  g.strokeStyle = "#16181d";
  g.lineWidth = 20;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(x + s * 0.21, y + s * 0.71);
  g.lineTo(x + s * 0.36, y + s * 0.3);
  g.lineTo(x + s * 0.5, y + s * 0.575);
  g.lineTo(x + s * 0.64, y + s * 0.3);
  g.lineTo(x + s * 0.79, y + s * 0.71);
  g.stroke();
  // Schriftzug
  g.fillStyle = "#16181d";
  g.font = '600 150px "Clash Display", sans-serif';
  g.textBaseline = "middle";
  g.fillText("Muster", 400, 215);
  g.fillStyle = "#c77d0a";
  g.fillText("Transporte", 400, 345);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, "rgba(0,0,0,0.75)");
  r.addColorStop(0.55, "rgba(0,0,0,0.35)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

function buildTruck() {
  const truck = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: 0x1b1d22, metalness: 0.6, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12 });
  const amber = new THREE.MeshPhysicalMaterial({ color: AMBER, metalness: 0.3, roughness: 0.35, clearcoat: 0.8 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0b0e14, metalness: 0.2, roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.92 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xc9ccd2, metalness: 1, roughness: 0.18 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0d0e11, metalness: 0.3, roughness: 0.8 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x101114, roughness: 0.9 });
  const light = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff1d6, emissiveIntensity: 2.4 });
  const tail = new THREE.MeshStandardMaterial({ color: 0x400000, emissive: 0xff2a1a, emissiveIntensity: 1.6 });

  // Zugmaschine (Front zeigt nach +x)
  const cab = new THREE.Mesh(new RoundedBoxGeometry(2.4, 2.9, 2.5, 6, 0.28), paint);
  cab.position.set(5.2, 2.75, 0);
  truck.add(cab);
  const roof = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.7, 2.3, 4, 0.25), paint);
  roof.position.set(4.95, 4.4, 0);
  truck.add(roof);
  const windshield = new THREE.Mesh(new RoundedBoxGeometry(0.08, 1.15, 2.2, 2, 0.04), glass);
  windshield.position.set(6.41, 3.45, 0);
  truck.add(windshield);
  for (const z of [-1.26, 1.26]) {
    const side = new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.95, 0.05, 2, 0.02), glass);
    side.position.set(5.6, 3.5, z);
    truck.add(side);
    const mirror = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.55, 0.14, 2, 0.05), dark);
    mirror.position.set(6.5, 3.4, z * 1.12);
    truck.add(mirror);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.18, 0.02), amber);
    stripe.position.set(5.2, 1.75, z * 1.0);
    truck.add(stripe);
  }
  const grille = new THREE.Mesh(new RoundedBoxGeometry(0.06, 1.0, 1.7, 2, 0.03), dark);
  grille.position.set(6.42, 2.15, 0);
  truck.add(grille);
  for (let i = 0; i < 5; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 1.55), chrome);
    bar.position.set(6.46, 1.8 + i * 0.18, 0);
    truck.add(bar);
  }
  for (const z of [-0.95, 0.95]) {
    const hl = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.18, 0.5, 2, 0.04), light);
    hl.position.set(6.44, 1.55, z);
    truck.add(hl);
  }
  const bumper = new THREE.Mesh(new RoundedBoxGeometry(0.35, 0.45, 2.5, 3, 0.12), dark);
  bumper.position.set(6.3, 1.15, 0);
  truck.add(bumper);
  // Sonnenblende + Lichtleiste
  const visor = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.14, 2.3, 2, 0.05), paint);
  visor.position.set(6.45, 4.08, 0);
  visor.rotation.z = -0.12;
  truck.add(visor);
  for (let i = 0; i < 6; i++) {
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.16), new THREE.MeshStandardMaterial({ color: AMBER, emissive: AMBER, emissiveIntensity: 2 }));
    l.position.set(5.75, 4.8, -0.8 + i * 0.32);
    truck.add(l);
  }
  // Windleitblech hinter dem Dach
  const deflector = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.9, 2.4, 3, 0.2), paint);
  deflector.position.set(4.3, 4.55, 0);
  deflector.rotation.z = 0.35;
  truck.add(deflector);
  // Auspuffrohre und Tank
  for (const z of [-1.1, 1.1]) {
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.4, 16), chrome);
    stack.position.set(3.95, 2.9, z);
    truck.add(stack);
  }
  for (const z of [-1.05, 1.05]) {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.3, 32), chrome);
    tank.rotation.z = Math.PI / 2;
    tank.position.set(4.2, 1.1, z);
    truck.add(tank);
  }

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.35, 1.2), dark);
  chassis.position.set(-0.3, 0.95, 0);
  truck.add(chassis);

  // Auflieger
  const livery = sideLivery();
  const white = new THREE.MeshPhysicalMaterial({ color: 0xf0eee9, roughness: 0.45, clearcoat: 0.4 });
  const sideMat = new THREE.MeshPhysicalMaterial({ map: livery, roughness: 0.45, clearcoat: 0.4 });
  const sideMatFlip = sideMat.clone();
  sideMatFlip.map = livery.clone();
  sideMatFlip.map.wrapS = THREE.RepeatWrapping;
  sideMatFlip.map.repeat.x = -1;
  sideMatFlip.map.needsUpdate = true;
  // Materialreihenfolge BoxGeometry: +x, -x, +y, -y, +z, -z
  const trailer = new THREE.Mesh(new THREE.BoxGeometry(10.6, 3.0, 2.55), [white, white, white, white, sideMat, sideMatFlip]);
  trailer.position.set(-1.65, 2.65, 0);
  truck.add(trailer);
  const trailerFrame = new THREE.Mesh(new THREE.BoxGeometry(10.62, 0.12, 2.57), dark);
  trailerFrame.position.set(-1.65, 1.12, 0);
  truck.add(trailerFrame);
  for (const z of [-1.2, 1.2]) {
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.55, 0.05), paint);
    skirt.position.set(0.3, 0.95, z);
    truck.add(skirt);
    const skirtLine = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.05, 0.06), amber);
    skirtLine.position.set(0.3, 1.2, z);
    truck.add(skirtLine);
  }
  for (const z of [-0.9, 0.9]) {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.4), tail);
    tl.position.set(-6.97, 1.3, z);
    truck.add(tl);
  }
  // Leere Kennzeichen-Fläche (bewusst ohne Kennzeichen)
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.18, 0.62), new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.6 }));
  plate.position.set(-6.98, 1.3, 0);
  truck.add(plate);

  // Räder
  const wheels: InstanceType<typeof THREE.Group>[] = [];
  const tireGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.36, 40);
  const hubGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.38, 24);
  const addWheel = (x: number, z: number) => {
    const w = new THREE.Group();
    const tire = new THREE.Mesh(tireGeo, rubber);
    const hub = new THREE.Mesh(hubGeo, chrome);
    w.add(tire, hub);
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.52, z);
    truck.add(w);
    wheels.push(w);
  };
  for (const x of [5.7, 3.4, 2.3, -4.2, -5.3, -6.4]) for (const z of [-1.08, 1.08]) addWheel(x, z);

  // Kotflügel
  for (const x of [5.7, 2.85]) {
    for (const z of [-1.12, 1.12]) {
      const f = new THREE.Mesh(new RoundedBoxGeometry(x > 5 ? 1.3 : 2.4, 0.12, 0.42, 2, 0.05), dark);
      f.position.set(x, 1.15, z);
      truck.add(f);
    }
  }

  truck.position.x = 0.3;
  return { truck, wheels };
}

export function mountTruck(canvas: HTMLCanvasElement, hero: HTMLElement, opts: { reduce: boolean }) {
  const mobile = window.innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
  const target = new THREE.Vector3(0, 2.3, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1c22, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(10, 14, 9);
  scene.add(key);
  const rim = new THREE.PointLight(AMBER, 60, 40, 1.6);
  rim.position.set(-9, 5, -6);
  scene.add(rim);

  const { truck, wheels } = buildTruck();
  scene.add(truck);

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(17, 5.5), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  scene.add(shadow);

  let w = 0,
    h = 0,
    isMobile = mobile;
  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    isMobile = w < 760;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Lkw am Desktop rechts neben dem Text, am Handy oberhalb des Texts
    if (isMobile) camera.setViewOffset(w, h, 0, h * 0.27, w, h);
    else camera.setViewOffset(w, h, -w * 0.17, h * 0.02, w, h);
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let mx = 0,
    my = 0;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let raf = 0;
  let running = false;
  let smoothAngle = 0.62;
  const clock = new THREE.Clock();

  const frame = () => {
    const t = clock.getElapsedTime();
    const rect = hero.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
    // Scrollen dreht die Kamera von schräg vorne bis zur Seite
    const targetAngle = 0.62 - p * 1.25 + (opts.reduce ? 0 : Math.sin(t * 0.18) * 0.05) + mx * 0.08;
    smoothAngle += (targetAngle - smoothAngle) * 0.08;
    const dist = isMobile ? 40 : 30;
    const elev = 2.6 + p * 4 - my * 0.6;
    camera.position.set(Math.cos(smoothAngle) * dist, elev, Math.sin(smoothAngle) * dist);
    camera.lookAt(target);
    if (!opts.reduce) for (const wh of wheels) wh.rotation.y -= 0.04;
    renderer.render(scene, camera);
  };

  const loop = () => {
    frame();
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (running) return;
    running = true;
    clock.start();
    raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  // Erstes Bild sofort, dann sichtbar machen
  frame();
  canvas.classList.add("is-ready");
  if (opts.reduce) {
    window.addEventListener("scroll", () => frame(), { passive: true });
    return;
  }
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()));
  io.observe(hero);
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : hero.getBoundingClientRect().bottom > 0 && play()));
}

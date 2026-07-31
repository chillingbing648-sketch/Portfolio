/**
 * Three.js Living Neural Network Canvas
 */

let _scrollSpeed = 0;

/** Returns the current scroll speed (set externally by scroll.js) */
export function getScrollSpeed() { return _scrollSpeed; }

/** Allows scroll.js to push velocity updates */
export function setScrollSpeed(v) { _scrollSpeed = v; }

export function initParticles(scrollSpeedGetter = () => _scrollSpeed) {
    const canvas = document.getElementById('webgl-bg');
    if (!canvas || typeof THREE === 'undefined') return;

    const neuralScene = new THREE.Scene();
    const neuralCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    neuralCamera.position.z = 28;

    const neuralRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    neuralRenderer.setSize(window.innerWidth, window.innerHeight);
    neuralRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const NODE_COUNT = 100;
    const MAX_CONN = 400;
    const CONN_DIST = 9;

    const nx = new Float32Array(NODE_COUNT);
    const ny = new Float32Array(NODE_COUNT);
    const nz = new Float32Array(NODE_COUNT);
    const nvx = new Float32Array(NODE_COUNT);
    const nvy = new Float32Array(NODE_COUNT);
    const nvz = new Float32Array(NODE_COUNT);
    const nEnergy = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
        nx[i] = (Math.random() - 0.5) * 50;
        ny[i] = (Math.random() - 0.5) * 40;
        nz[i] = (Math.random() - 0.5) * 20;
        nvx[i] = (Math.random() - 0.5) * 0.025;
        nvy[i] = (Math.random() - 0.5) * 0.025;
        nvz[i] = (Math.random() - 0.5) * 0.01;
        nEnergy[i] = 0;
    }

    const nodePositions = new Float32Array(NODE_COUNT * 3);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const pCanvas2 = document.createElement('canvas');
    pCanvas2.width = 32; pCanvas2.height = 32;
    const pCtx2 = pCanvas2.getContext('2d');
    const pGrad2 = pCtx2.createRadialGradient(16,16,0,16,16,16);
    pGrad2.addColorStop(0,'rgba(255,255,255,1)');
    pGrad2.addColorStop(0.4,'rgba(139,92,246,0.8)');
    pGrad2.addColorStop(1,'rgba(0,0,0,0)');
    pCtx2.fillStyle = pGrad2;
    pCtx2.fillRect(0,0,32,32);
    const nodeTex = new THREE.Texture(pCanvas2);
    nodeTex.needsUpdate = true;

    const nodeMat = new THREE.PointsMaterial({
        size: 0.5,
        map: nodeTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    neuralScene.add(nodePoints);

    const connPositions = new Float32Array(MAX_CONN * 6);
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute('position', new THREE.BufferAttribute(connPositions, 3));
    connGeo.setDrawRange(0, 0);
    const connMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const connLines = new THREE.LineSegments(connGeo, connMat);
    neuralScene.add(connLines);

    let mouseNX = 0, mouseNY = 0;
    window.addEventListener('mousemove', e => {
        mouseNX = ((e.clientX / window.innerWidth) - 0.5) * 50;
        mouseNY = -((e.clientY / window.innerHeight) - 0.5) * 40;
    }, { passive: true });

    function animateNeural() {
        const speed = 1 + getScrollSpeed() * 0.8;

        for (let i = 0; i < NODE_COUNT; i++) {
            nx[i] += nvx[i] * speed;
            ny[i] += nvy[i] * speed;
            nz[i] += nvz[i] * speed;
            if (nx[i] > 25 || nx[i] < -25) nvx[i] *= -1;
            if (ny[i] > 20 || ny[i] < -20) nvy[i] *= -1;
            if (nz[i] > 10 || nz[i] < -10) nvz[i] *= -1;

            const dx = nx[i] - mouseNX;
            const dy = ny[i] - mouseNY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 7) {
                nEnergy[i] = Math.min(1, nEnergy[i] + 0.06);
            } else {
                nEnergy[i] = Math.max(0, nEnergy[i] - 0.015);
            }

            const pi3 = i * 3;
            nodePositions[pi3] = nx[i];
            nodePositions[pi3+1] = ny[i];
            nodePositions[pi3+2] = nz[i];
        }
        nodeGeo.attributes.position.needsUpdate = true;

        let connCount = 0;
        for (let i = 0; i < NODE_COUNT && connCount < MAX_CONN; i++) {
            for (let j = i+1; j < NODE_COUNT && connCount < MAX_CONN; j++) {
                const dx = nx[i]-nx[j], dy = ny[i]-ny[j], dz = nz[i]-nz[j];
                const dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                if (dist < CONN_DIST) {
                    const idx = connCount*6;
                    connPositions[idx]=nx[i]; connPositions[idx+1]=ny[i]; connPositions[idx+2]=nz[i];
                    connPositions[idx+3]=nx[j]; connPositions[idx+4]=ny[j]; connPositions[idx+5]=nz[j];
                    connCount++;
                }
            }
        }
        connGeo.setDrawRange(0, connCount*2);
        connGeo.attributes.position.needsUpdate = true;

        let avgEnergy = 0;
        for (let i=0;i<NODE_COUNT;i++) avgEnergy += nEnergy[i];
        avgEnergy /= NODE_COUNT;
        connMat.opacity = 0.18 + avgEnergy * 0.35;
        nodeMat.size = 0.4 + avgEnergy * 0.6;

        neuralRenderer.render(neuralScene, neuralCamera);
        requestAnimationFrame(animateNeural);
    }
    animateNeural();

    window.addEventListener('resize', () => {
        neuralCamera.aspect = window.innerWidth / window.innerHeight;
        neuralCamera.updateProjectionMatrix();
        neuralRenderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });
}

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { previewModelScene } from './previewModel'
import { lights } from './lights'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

const textureLoader = new THREE.TextureLoader()

/**+
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const rgbeloader = new RGBELoader()
rgbeloader.load('./environmentMap/1k-3.hdr', (emap) => {
    emap.mapping = THREE.EquirectangularReflectionMapping
    // scene.background = emap
    scene.background = new THREE.Color(0xe4e6e8)
    scene.environment = emap
})

/**
 * House
 */

/**
 * Lights
 */

scene.add(lights())


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth / 4 * 3,
    height: window.innerHeight / 4 * 3
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 4 * 3
    sizes.height = window.innerHeight / 4 * 3

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)






// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.target = new THREE.Vector3(0, 0, 0)
controls.minDistance = 3
controls.maxDistance = 6
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI / 3 + .25
controls.minAzimuthAngle = - (Math.PI / 3 + .25)
controls.maxAzimuthAngle = Math.PI / 3 + .25



camera.position.x = 0
camera.position.y = 2
camera.position.z = 4
camera.lookAt(.5, 0, .5)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const timer = new Timer()

previewModelScene(scene, gui, camera, canvas)

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
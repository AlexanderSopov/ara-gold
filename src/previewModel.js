import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

export const previewModelScene = async (scene, gui, camera, canvas) => {
  const broja = await brojanica()
  scene.add(
    createFloor(gui),
    broja,
    // createXYHelper(),
    // createHouse(),
    // createBushes(),
    // createGraves(),
    // createGold(),
  )

}

const brojanica = async () => {

  const goldMetallic = textureLoader.load('./brushed/metal.png')
  const goldRoughness = textureLoader.load('./brushed/rough.png')
  const goldColor = textureLoader.load('./brushed/diffuse.png')
  goldColor.colorSpace = THREE.SRGBColorSpace
  // const bracelet = await gltfLoader.loadAsync('./decimated-brojanica/model.gltf')
  const bracelet = await gltfLoader.loadAsync('./pivoted/model.gltf')
  const group = new THREE.Group()
  const [cross1, wristband, cross2] = bracelet.scene.children[0].children[0].children
  wristband.position.set(0,0,0)
  cross1.position.set(0,0,0)
  cross2.position.set(0,0,0)
  wristband.scale.set(.1, .1, .1)
  cross1.scale.set(.1, .1, .1)
  cross2.scale.set(.1, .1, .1)

  wristband.material.color = new THREE.Color(0, 0, 0)
  wristband.material.metalness = 0
  window.material = wristband.material

  cross1.material.metalMap = goldMetallic
  cross1.material.roughnessMap = goldRoughness
  cross1.material.metalMap = goldMetallic
  cross2.material.roughnessMap = goldRoughness

  
  cross1.castShadow = true
  cross2.castShadow = true
  // cross1.rotateZ(Math.PI / 6)
  // cross2.rotateZ(Math.PI / 6)
  wristband.castShadow = true
  const position = new THREE.Vector3()
  cross1.getWorldPosition(position)
  console.log(position)

  group.add(cross1, cross2, wristband)
  group.position.set(0, .5, 0)
  group.rotation.x = Math.PI - .075
  group.rotation.y = Math.PI
  // group.rotation.x = -.2
  window.group = group
  return (group)
}

const createFloor = (gui) => {
  const geo = new THREE.BoxGeometry(200, 200, 200)

  const floor = new THREE.Mesh(
    // geo,
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({
      // color: 0xffffff,
      color: 0x00000,
      opacity: .2,
      // side: THREE.BackSide
    })
  )
  const floor2 = new THREE.Mesh(
    // geo,
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
      color: 0xe4e6e8,
      // color: 0xffffff,
      // side: THREE.BackSide
    })
  )
  floor.receiveShadow = true
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0
  floor2.rotation.x = -Math.PI / 2
  floor2.position.y = -.01
  const floors = new THREE.Group()
  floors.add(floor, floor2)
  return floors
}
const createXYHelper = () => {
  const xGeo = new THREE.BoxGeometry(1, .1, .1)
  const yGeo = new THREE.BoxGeometry(.1, 1, .1)
  const zGeo = new THREE.BoxGeometry(.1, .1, 1)
  const red = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const green = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const blue = new THREE.MeshBasicMaterial({ color: 0x0000ff })

  const x = new THREE.Mesh(
    xGeo, red
  )
  const y = new THREE.Mesh(
    yGeo, green
  )
  const z = new THREE.Mesh(
    zGeo, blue
  )
  
  const group = new THREE.Group()
  group.add(x, y, z)
  return group

}
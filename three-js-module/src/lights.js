import {
  Group,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
} from "three"

export const lights = () => {
  const lights = new Group()

  // Ambient light
  const ambientLight = new AmbientLight('#e4e6e8', 0.5)
  ambientLight.castShadow = false
  lights.add(ambientLight)

  // Directional light
  const directionalLight = new DirectionalLight('#ffffff', 1.5)
  directionalLight.position.set(1, 4, 5)
  directionalLight.castShadow = true

  lights.add(new DirectionalLightHelper(directionalLight))


// const pointLight = new THREE.PointLight('#ffffff', 1.5, 50)
// pointLight.position.set(1, 1, 1)
// pointLight.castShadow = true
// const phelper = new THREE.PointLightHelper( pointLight, 5 );

  lights.add(directionalLight, ambientLight)

  return lights
}
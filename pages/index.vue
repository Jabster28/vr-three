<template>
  <div class="container"></div>
</template>

<script>
/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { VRButton } from '../static/VRButton.js'
import { BoxLineGeometry } from '../static/BoxLineGeometry.js'
export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      frameID: 0,
    }
  },
  mounted() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    document.body.appendChild(VRButton.createButton(renderer))

    scene.background = new THREE.Color(0x505050)

    const room = new THREE.LineSegments(
      new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 0, 0),
      new THREE.LineBasicMaterial({ color: 0x808080 })
    )
    scene.add(room)
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
    })

    scene.add(new THREE.HemisphereLight(0x606060, 0x404040))

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    this.cube = cube

    camera.position.z = 3

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    renderer.xr.setFramebufferScaleFactor(2)
    renderer.xr.enabled = true

    renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
    })
  },
  beforeDestroy() {
    this.renderer.domElement.remove()
    this.renderer.dispose()
    delete this.scene
    delete this.camera
    delete this.renderer
  },
}
</script>

<style>
body {
  margin: 0;
}
canvas {
  display: block;
}
</style>

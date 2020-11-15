import { BufferGeometry, Float32BufferAttribute } from 'three'

const BoxLineGeometry = function (
  width,
  height,
  depth,
  widthSegments,
  heightSegments,
  depthSegments
) {
  BufferGeometry.call(this)

  width = width || 1
  height = height || 1
  depth = depth || 1

  widthSegments = Math.floor(widthSegments) || 1
  heightSegments = Math.floor(heightSegments) || 1
  depthSegments = Math.floor(depthSegments) || 1

  const widthHalf = width / 2
  const heightHalf = height / 2
  const depthHalf = depth / 2

  const segmentWidth = width / widthSegments
  const segmentHeight = height / heightSegments
  const segmentDepth = depth / depthSegments

  const vertices = []

  let x = -widthHalf
  let y = -heightHalf
  let z = -depthHalf

  for (let i = 0; i <= widthSegments; i++) {
    vertices.push(x, -heightHalf, -depthHalf, x, heightHalf, -depthHalf)
    vertices.push(x, heightHalf, -depthHalf, x, heightHalf, depthHalf)
    vertices.push(x, heightHalf, depthHalf, x, -heightHalf, depthHalf)
    vertices.push(x, -heightHalf, depthHalf, x, -heightHalf, -depthHalf)

    x += segmentWidth
  }

  for (let i = 0; i <= heightSegments; i++) {
    vertices.push(-widthHalf, y, -depthHalf, widthHalf, y, -depthHalf)
    vertices.push(widthHalf, y, -depthHalf, widthHalf, y, depthHalf)
    vertices.push(widthHalf, y, depthHalf, -widthHalf, y, depthHalf)
    vertices.push(-widthHalf, y, depthHalf, -widthHalf, y, -depthHalf)

    y += segmentHeight
  }

  for (let i = 0; i <= depthSegments; i++) {
    vertices.push(-widthHalf, -heightHalf, z, -widthHalf, heightHalf, z)
    vertices.push(-widthHalf, heightHalf, z, widthHalf, heightHalf, z)
    vertices.push(widthHalf, heightHalf, z, widthHalf, -heightHalf, z)
    vertices.push(widthHalf, -heightHalf, z, -widthHalf, -heightHalf, z)

    z += segmentDepth
  }

  this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
}

BoxLineGeometry.prototype = Object.create(BufferGeometry.prototype)
BoxLineGeometry.prototype.constructor = BoxLineGeometry

export { BoxLineGeometry }

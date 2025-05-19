import { useEffect, useRef } from 'react'
import { Application, Assets, Sprite } from 'pixi.js'

const gridSize = 8
const tileSize = 64

export const PixiGrid = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const app = new Application()
    app.init({
      width: gridSize * tileSize,
      height: gridSize * tileSize,
      backgroundColor: 0xAAAAAA
    }).then(async () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '' // Clear previous render
        canvasRef.current.appendChild(app.canvas) // <- Note le `.canvas` ici
      }

      // Précharge l'image
      const texture = await Assets.load('/src/assets/grass.png')

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const sprite = new Sprite(texture)
          sprite.x = x * tileSize
          sprite.y = y * tileSize
          sprite.width = tileSize
          sprite.height = tileSize
          app.stage.addChild(sprite)
        }
      }
    })

    return () => {
      app.destroy(true)
    }
  }, [])

  return <div ref={canvasRef} />
}

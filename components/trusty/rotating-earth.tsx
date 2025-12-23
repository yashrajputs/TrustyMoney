"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  opacity?: number
  isBackground?: boolean
}

const countries = [
  { name: "United States", coordinates: [-95.7129, 37.0902] as [number, number], code: "us" },
  { name: "Brazil", coordinates: [-51.9253, -14.235] as [number, number], code: "br" },
  { name: "United Kingdom", coordinates: [-3.435973, 55.378051] as [number, number], code: "gb" },
  { name: "Japan", coordinates: [138.2529, 36.2048] as [number, number], code: "jp" },
  { name: "Australia", coordinates: [133.7751, -25.2744] as [number, number], code: "au" },
  { name: "South Africa", coordinates: [22.9375, -30.5595] as [number, number], code: "za" },
  { name: "Germany", coordinates: [10.4515, 51.1657] as [number, number], code: "de" },
  { name: "France", coordinates: [2.2137, 46.2276] as [number, number], code: "fr" },
  { name: "India", coordinates: [78.9629, 20.5937] as [number, number], code: "in" },
  { name: "China", coordinates: [104.1954, 35.8617] as [number, number], code: "cn" },
  { name: "Russia", coordinates: [105.3188, 61.524] as [number, number], code: "ru" },
  { name: "Canada", coordinates: [-106.3468, 56.1304] as [number, number], code: "ca" },
  { name: "Mexico", coordinates: [-102.5528, 23.6345] as [number, number], code: "mx" },
  { name: "Argentina", coordinates: [-63.6167, -38.4161] as [number, number], code: "ar" },
  { name: "Egypt", coordinates: [30.8025, 26.8206] as [number, number], code: "eg" },
  { name: "Nigeria", coordinates: [8.6753, 9.082] as [number, number], code: "ng" },
  { name: "South Korea", coordinates: [127.7669, 35.9078] as [number, number], code: "kr" },
  { name: "Spain", coordinates: [-3.7492, 40.4637] as [number, number], code: "es" },
  { name: "Italy", coordinates: [12.5674, 41.8719] as [number, number], code: "it" },
  { name: "Turkey", coordinates: [35.2433, 38.9637] as [number, number], code: "tr" },
]

const countryConnections = [
  {
    from: { name: "United States", coordinates: [-95.7129, 37.0902] as [number, number], code: "us" },
    to: { name: "United Kingdom", coordinates: [-3.435973, 55.378051] as [number, number], code: "gb" },
  },
  {
    from: { name: "United Kingdom", coordinates: [-3.435973, 55.378051] as [number, number], code: "gb" },
    to: { name: "Japan", coordinates: [138.2529, 36.2048] as [number, number], code: "jp" },
  },
  {
    from: { name: "Brazil", coordinates: [-51.9253, -14.235] as [number, number], code: "br" },
    to: { name: "South Africa", coordinates: [22.9375, -30.5595] as [number, number], code: "za" },
  },
  {
    from: { name: "Japan", coordinates: [138.2529, 36.2048] as [number, number], code: "jp" },
    to: { name: "Australia", coordinates: [133.7751, -25.2744] as [number, number], code: "au" },
  },
  {
    from: { name: "United States", coordinates: [-95.7129, 37.0902] as [number, number], code: "us" },
    to: { name: "Brazil", coordinates: [-51.9253, -14.235] as [number, number], code: "br" },
  },
  {
    from: { name: "Germany", coordinates: [10.4515, 51.1657] as [number, number], code: "de" },
    to: { name: "China", coordinates: [104.1954, 35.8617] as [number, number], code: "cn" },
  },
  {
    from: { name: "France", coordinates: [2.2137, 46.2276] as [number, number], code: "fr" },
    to: { name: "India", coordinates: [78.9629, 20.5937] as [number, number], code: "in" },
  },
  {
    from: { name: "Canada", coordinates: [-106.3468, 56.1304] as [number, number], code: "ca" },
    to: { name: "Russia", coordinates: [105.3188, 61.524] as [number, number], code: "ru" },
  },
  {
    from: { name: "Mexico", coordinates: [-102.5528, 23.6345] as [number, number], code: "mx" },
    to: { name: "Argentina", coordinates: [-63.6167, -38.4161] as [number, number], code: "ar" },
  },
  {
    from: { name: "Egypt", coordinates: [30.8025, 26.8206] as [number, number], code: "eg" },
    to: { name: "Nigeria", coordinates: [8.6753, 9.082] as [number, number], code: "ng" },
  },
  {
    from: { name: "South Korea", coordinates: [127.7669, 35.9078] as [number, number], code: "kr" },
    to: { name: "Australia", coordinates: [133.7751, -25.2744] as [number, number], code: "au" },
  },
  {
    from: { name: "Spain", coordinates: [-3.7492, 40.4637] as [number, number], code: "es" },
    to: { name: "Mexico", coordinates: [-102.5528, 23.6345] as [number, number], code: "mx" },
  },
  {
    from: { name: "Italy", coordinates: [12.5674, 41.8719] as [number, number], code: "it" },
    to: { name: "Turkey", coordinates: [35.2433, 38.9637] as [number, number], code: "tr" },
  },
  {
    from: { name: "China", coordinates: [104.1954, 35.8617] as [number, number], code: "cn" },
    to: { name: "United States", coordinates: [-95.7129, 37.0902] as [number, number], code: "us" },
  },
  {
    from: { name: "India", coordinates: [78.9629, 20.5937] as [number, number], code: "in" },
    to: { name: "United Kingdom", coordinates: [-3.435973, 55.378051] as [number, number], code: "gb" },
  },
]

export default function RotatingEarth({ width = 800, height = 600, className = "", opacity = 1, isBackground = false }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const flagImagesRef = useRef<Map<string, HTMLImageElement>>(new Map())

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const getContainerSize = () => {
      const parent = canvas.parentElement
      if (parent) {
        return {
          width: parent.clientWidth || width,
          height: parent.clientHeight || height,
        }
      }
      return {
        width: Math.min(width, window.innerWidth - 40),
        height: Math.min(height, window.innerHeight - 100),
      }
    }

    const { width: containerWidth, height: containerHeight } = getContainerSize()
    const radius = Math.min(containerWidth, containerHeight) / 2.1

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      console.log(
        `[v0] Generated ${pointsGenerated} points for land feature:`,
        feature.properties?.featurecla || "Land",
      )
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#000000"
      context.fill()
      context.strokeStyle = "#ffffff"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#999999"
            context.fill()
          }
        })

        countryConnections.forEach((connection) => {
          const fromProjected = projection(connection.from.coordinates)
          const toProjected = projection(connection.to.coordinates)
          if (!fromProjected || !toProjected) return

          const centerCoords = (projection.invert && projection.invert([containerWidth / 2, containerHeight / 2])) || [0, 0] as [number, number]
          const fromDistance = d3.geoDistance(connection.from.coordinates, centerCoords)
          const toDistance = d3.geoDistance(connection.to.coordinates, centerCoords)
          const fromVisible = fromDistance < Math.PI / 2
          const toVisible = toDistance < Math.PI / 2

          if (fromVisible && toVisible) {
            const dx = toProjected[0] - fromProjected[0]
            const dy = toProjected[1] - fromProjected[1]
            const distance = Math.sqrt(dx * dx + dy * dy)

            const midX = (fromProjected[0] + toProjected[0]) / 2
            const midY = (fromProjected[1] + toProjected[1]) / 2
            const curvature = distance * 0.2
            const angle = Math.atan2(dy, dx)
            const controlX = midX - curvature * Math.sin(angle)
            const controlY = midY + curvature * Math.cos(angle)

            context.beginPath()
            context.moveTo(fromProjected[0], fromProjected[1])
            context.quadraticCurveTo(controlX, controlY, toProjected[0], toProjected[1])
            context.strokeStyle = "#4a9eff"
            context.lineWidth = 2 * scaleFactor
            context.stroke()

            const headLength = 12 * scaleFactor
            const t = 0.95
            const arrowX = (1 - t) * (1 - t) * fromProjected[0] + 2 * (1 - t) * t * controlX + t * t * toProjected[0]
            const arrowY = (1 - t) * (1 - t) * fromProjected[1] + 2 * (1 - t) * t * controlY + t * t * toProjected[1]

            const arrowAngle = Math.atan2(toProjected[1] - arrowY, toProjected[0] - arrowX)

            context.beginPath()
            context.moveTo(toProjected[0], toProjected[1])
            context.lineTo(
              toProjected[0] - headLength * Math.cos(arrowAngle - Math.PI / 6),
              toProjected[1] - headLength * Math.sin(arrowAngle - Math.PI / 6),
            )
            context.moveTo(toProjected[0], toProjected[1])
            context.lineTo(
              toProjected[0] - headLength * Math.cos(arrowAngle + Math.PI / 6),
              toProjected[1] - headLength * Math.sin(arrowAngle + Math.PI / 6),
            )
            context.strokeStyle = "#4a9eff"
            context.lineWidth = 2 * scaleFactor
            context.stroke()

            context.beginPath()
            context.arc(fromProjected[0], fromProjected[1], 5 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#4a9eff"
            context.fill()

            context.beginPath()
            context.arc(toProjected[0], toProjected[1], 5 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#ff6b6b"
            context.fill()

            const flagSize = 16 * scaleFactor
            const labelOffset = 22 * scaleFactor

            const fromFlag = flagImagesRef.current.get(connection.from.code)
            if (fromFlag) {
              context.drawImage(
                fromFlag,
                fromProjected[0] - flagSize / 2,
                fromProjected[1] - labelOffset - flagSize,
                flagSize,
                flagSize * (fromFlag.height / fromFlag.width),
              )
            }

            context.font = `${11 * scaleFactor}px sans-serif`
            context.fillStyle = "#ffffff"
            context.textAlign = "center"
            context.fillText(
              connection.from.name,
              fromProjected[0],
              fromProjected[1] - (labelOffset + flagSize + 4 * scaleFactor),
            )

            const toFlag = flagImagesRef.current.get(connection.to.code)
            if (toFlag) {
              context.drawImage(
                toFlag,
                toProjected[0] - flagSize / 2,
                toProjected[1] - labelOffset - flagSize,
                flagSize,
                flagSize * (toFlag.height / toFlag.width),
              )
            }

            context.fillText(
              connection.to.name,
              toProjected[0],
              toProjected[1] - (labelOffset + flagSize + 4 * scaleFactor),
            )
          }
        })
      }
    }

    const loadFlagImages = async () => {
      const uniqueCodes = new Set<string>()
      countryConnections.forEach((conn) => {
        uniqueCodes.add(conn.from.code)
        uniqueCodes.add(conn.to.code)
      })

      const imageLoadPromises = Array.from(uniqueCodes).map((code) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            flagImagesRef.current.set(code, img)
            console.log(`[v0] Loaded flag for ${code}`)
            resolve()
          }
          img.onerror = () => {
            console.log(`[v0] Failed to load flag for ${code}`)
            resolve()
          }
          img.src = `https://flagcdn.com/w40/${code}.png`
        })
      })

      await Promise.all(imageLoadPromises)
      console.log(`[v0] Loaded ${flagImagesRef.current.size} flag images`)
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        await loadFlagImages()

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        let totalDots = 0
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
            totalDots++
          })
        })

        console.log(`[v0] Total dots generated: ${totalDots} across ${landFeatures.features.length} land features`)

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)

    loadWorldData()

    // Handle resize
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = getContainerSize()
      if (newWidth !== containerWidth || newHeight !== containerHeight) {
        // Re-initialize on resize
        const dpr = window.devicePixelRatio || 1
        canvas.width = newWidth * dpr
        canvas.height = newHeight * dpr
        canvas.style.width = `${newWidth}px`
        canvas.style.height = `${newHeight}px`
        context.scale(dpr, dpr)
        
        const newRadius = Math.min(newWidth, newHeight) / 2.1
        projection.scale(newRadius).translate([newWidth / 2, newHeight / 2])
        render()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", handleResize)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className} ${isBackground ? "pointer-events-none" : ""}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-auto ${isBackground ? "" : "rounded-2xl"}`}
        style={{ maxWidth: "100%", height: "auto", opacity, background: "transparent" }}
      />
    </div>
  )
}


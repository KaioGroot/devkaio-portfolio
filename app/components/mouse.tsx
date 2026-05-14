"use client"
import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorVariant = "default" | "hover" | "click"

export default function Mouse() {
  const [variant, setVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)

  // Posição raw do mouse
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Ponto central (segue rápido)
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.2 })
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.2 })

  // Anel externo (segue devagar — efeito lag elegante)
  const ringX = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.8 })
  const ringY = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.8 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onDown  = () => setVariant("click")
    const onUp    = () => setVariant("hover")
    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    // Detecta elementos interativos pra mudar o variant
    const addHover = () => {
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("hover"))
        el.addEventListener("mouseleave", () => setVariant("default"))
      })
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    // Roda após hydration pra pegar todos os elementos
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
      observer.disconnect()
    }
  }, [rawX, rawY, isVisible])

  // Esconde cursor nativo globalmente
  useEffect(() => {
    document.documentElement.style.cursor = "none"
    return () => { document.documentElement.style.cursor = "" }
  }, [])

  const isHover = variant === "hover"
  const isClick = variant === "click"

  return (
    <>
      {/* ── Anel externo — lag suave ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClick ? 0.7 : isHover ? 1.8 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 300, damping: 25 } }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: isHover
              ? "1px solid rgba(255,255,255,0.9)"
              : "1px solid rgba(255,255,255,0.35)",
            backdropFilter: isHover ? "blur(0px)" : "blur(0px)",
            transition: "border-color 0.3s ease",
          }}
        />
      </motion.div>

      {/* ── Ponto central — resposta instantânea ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClick ? 0.5 : isHover ? 0 : 1,
          backgroundColor: isHover ? "#ffffff" : "#ffffff",
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 500, damping: 30 } }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
      </motion.div>

      {/* ── Trail de partículas ── */}
      <TrailDots rawX={rawX} rawY={rawY} visible={isVisible} />
    </>
  )
}

// ── Trail: deixa 6 pontos que seguem o cursor com delay crescente ──────────

function TrailDots({
  rawX,
  rawY,
  visible,
}: {
  rawX: ReturnType<typeof useMotionValue<number>>
  rawY: ReturnType<typeof useMotionValue<number>>
  visible: boolean
}) {
  const COUNT = 6

  // Cada ponto tem stiffness menor (mais lento) conforme o índice aumenta
  const dots = Array.from({ length: COUNT }, (_, i) => {
    const stiffness = 180 - i * 22
    const damping   = 20 + i * 1.5
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useSpring(rawX, { stiffness, damping, mass: 0.5 + i * 0.15 })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useSpring(rawY, { stiffness, damping, mass: 0.5 + i * 0.15 })
    return { x, y }
  })

  return (
    <>
      {dots.map((dot, i) => {
        const size    = 3 - i * 0.35          // diminui com o índice
        const opacity = (0.18 - i * 0.025)    // fica mais transparente no fim

        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-white"
            style={{
              x: dot.x,
              y: dot.y,
              translateX: "-50%",
              translateY: "-50%",
              width:  Math.max(size, 0.8),
              height: Math.max(size, 0.8),
              opacity: visible ? Math.max(opacity, 0) : 0,
            }}
          />
        )
      })}
    </>
  )
}

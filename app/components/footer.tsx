'use client'
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faEnvelope, faLocationDot, faArrowUp, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"

// ── Dados ──────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Projetos", href: "/projects" },
  { label: "Contato", href: "/contact" },
]

const socials = [
  { icon: faGithub, href: "#", label: "GitHub" },
  { icon: faLinkedin, href: "#", label: "LinkedIn" },
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faDiscord, href: "#", label: "Discord" },
]

// ── Blob flutuante azul/roxo ───────────────────────────────────────────────

function FloatingBlob() {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: "480px",
        height: "320px",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        filter: "blur(90px)",
        opacity: 0.28,
      }}
      animate={{
        x: ["-10%", "10%", "-6%", "8%", "-10%"],
        y: ["-8%", "6%", "10%", "-5%", "-8%"],
        background: [
          "radial-gradient(ellipse, #6366f1, #3b82f6)",
          "radial-gradient(ellipse, #3b82f6, #8b5cf6)",
          "radial-gradient(ellipse, #8b5cf6, #06b6d4)",
          "radial-gradient(ellipse, #06b6d4, #6366f1)",
          "radial-gradient(ellipse, #6366f1, #3b82f6)",
        ],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/45 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
    >
      <span className="w-0 group-hover:w-2.5 h-px bg-white/60 transition-all duration-300 inline-block" />
      {children}
    </Link>
  )
}

function SocialBtn({ icon, href, label, delay }: { icon: any; href: string; label: string; delay: number }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <FontAwesomeIcon icon={icon} className="w-3.5" />
    </motion.a>
  )
}

// ── Variantes de animação ──────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] },
  }),
}

// ── Footer ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      {/* Botão voltar ao topo */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{
              background: "rgba(99,102,241,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} className="w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer
        className="relative overflow-hidden"
        style={{ background: "#04060f" }}
      >
        {/* ── Grade de linhas verticais + horizontais ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Blob flutuante ── */}
        <FloatingBlob />

        {/* ── Nome "Kaio" em stroke — fundo absoluto ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            style={{
              fontSize: "clamp(100px, 22vw, 240px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.07)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            Kaio
          </span>
        </div>

        {/* ── Fade top ── */}
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #04060f, transparent)" }}
        />

        {/* ── Conteúdo ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-8 pt-20 pb-10">

          {/* Grid 3 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1 — Brand */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">Dev</span>
                <FontAwesomeIcon icon={faCode} className="w-4 text-indigo-400" />
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-[220px]">
                Construindo interfaces que encantam e experiências que ficam na memória.
              </p>
              <div className="flex items-center gap-1.5 text-white/30 text-xs">
                <FontAwesomeIcon icon={faLocationDot} className="w-3 text-indigo-400/60" />
                <span>Brasil</span>
              </div>
              <div className="flex gap-2 mt-1">
                {socials.map((s, i) => (
                  <SocialBtn key={i} {...s} delay={0.1 + i * 0.06} />
                ))}
              </div>
            </motion.div>

            {/* Col 2 — Nav */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-white/50 text-xs uppercase tracking-[0.2em]">
                Navegação
              </h3>
              <ul className="flex flex-col gap-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 3 — Contato */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-white/50 text-xs uppercase tracking-[0.2em]">
                Contato
              </h3>
              <a
                href="mailto:kaio@email.com"
                className="flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors group"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 text-indigo-400/60 group-hover:text-indigo-300 transition-colors" />
                kaio@email.com
              </a>

              <div
                className="mt-1 p-3.5 rounded-xl flex flex-col gap-1.5"
                style={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.05)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs">Disponível para projetos</span>
                </div>
                <p className="text-white/30 text-xs">Aberto a freela e trabalhos remotos.</p>
              </div>
            </motion.div>
          </div>

          {/* Divisor */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="mt-14 h-px origin-left"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent)" }}
          />

          {/* Bottom bar */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          >
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Kaio Ferreira. Todos os direitos reservados.
            </p>
            <p className="text-white/20 text-xs flex items-center gap-1.5">
              Feito com{" "}
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FontAwesomeIcon icon={faHeart} className="w-3 text-rose-400/60" />
              </motion.span>
              e Next.js
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}

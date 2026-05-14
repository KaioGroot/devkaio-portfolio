'use client'

import Navbar from "../components/navbar"
import Mouse from "../components/mouse"
import Footer from "../components/footer"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
})

const socials = [
  { icon: faEnvelope,  label: "EMAIL",    handle: "kaiomagalhaesxp@gmail.com", href: "mailto:kaiomagalhaesxp@gmail.com" },
  { icon: faGithub,    label: "GITHUB",   handle: "KaioGroot",                 href: "https://github.com/KaioGroot" },
  { icon: faInstagram, label: "INSTAGRAM",handle: "@kaiowdev",                 href: "https://instagram.com/kaiowdev" },
  { icon: faDiscord,   label: "DISCORD",  handle: "thestrangertenno",          href: "#" },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Mouse />

      <main className="bg-black text-white min-h-screen">

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center px-6 md:px-14 lg:px-20 pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Video fundo */}
          <div className="absolute inset-0">
            <video src="/rocket.mp4" autoPlay loop muted playsInline
              className="w-full h-full object-cover opacity-20 blur-sm" />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, black 100%)" }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

            {/* Esquerda */}
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] tracking-[0.35em] text-white/30 mb-8 font-mono">
                CONTATO
              </motion.p>

              <motion.h1
                {...fadeUp(0.05)}
                className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-[-5px] mb-8"
              >
                Vamos
                <br />
                <span className="text-white/20">conversar?</span>
              </motion.h1>

              <motion.p {...fadeUp(0.1)} className="text-white/40 leading-relaxed max-w-sm mb-10 text-sm">
                Estou disponível para novos projetos e oportunidades. Se quiser trabalhar juntos ou só trocar uma ideia, é só chamar.
              </motion.p>

              <motion.a
                {...fadeUp(0.15)}
                href="mailto:kaiomagalhaesxp@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-white text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 group"
              >
                ENVIAR EMAIL
                <FontAwesomeIcon icon={faArrowRight} className="w-3 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.div {...fadeUp(0.2)} className="flex items-center gap-2.5 mt-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs text-white/30 tracking-widest font-mono">DISPONÍVEL PARA PROJETOS</span>
              </motion.div>
            </div>

            {/* Direita — cards */}
            <div className="flex flex-col gap-3">
              {socials.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp(0.1 + i * 0.08)}
                  whileHover="hover"
                  className="group relative flex items-center gap-5 px-6 py-5 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                >
                  <motion.span
                    className="absolute left-0 top-0 h-full w-px bg-white"
                    variants={{ hover: { scaleY: 1 } }}
                    initial={{ scaleY: 0 }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] tracking-[0.3em] text-white/30 mb-0.5 font-mono">{item.label}</span>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">{item.handle}</span>
                  </div>
                  <motion.div
                    className="ml-auto"
                    variants={{ hover: { x: 4, opacity: 1 } }}
                    initial={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-white/40" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

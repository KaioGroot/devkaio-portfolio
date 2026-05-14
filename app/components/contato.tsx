"use client"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
})

const socials = [
  { icon: faGithub,    label: "GITHUB",    handle: "KaioGroot",          href: "https://github.com/KaioGroot" },
  { icon: faInstagram, label: "INSTAGRAM", handle: "@kaiowdev",          href: "https://instagram.com/kaiowdev" },
  { icon: faDiscord,   label: "DISCORD",   handle: "thestrangertenno",   href: "#" },
]

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative w-full min-h-screen overflow-hidden bg-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Vídeo cobrindo 100% do fundo, fixo, sem encolher ── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/rocket.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover backdrop-blur-sm pointer-events-none blur-sm"
        />
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Vinheta nas bordas */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 100% 50%, transparent 20%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Grade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Linha topo ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative z-10 w-full h-px bg-white/[0.08] origin-left"
      />

      {/* ── Conteúdo ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-28 md:py-40">

        <motion.p {...fadeUp(0)} className="text-[11px] tracking-[0.35em] text-white/30 mb-8 font-mono">
          CONTATO
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Esquerda */}
          <div>
            <motion.h2
              {...fadeUp(0.05)}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.9] tracking-[-3px] mb-8"
            >
              Vamos
              <br />
              <span className="text-white/20">conversar?</span>
            </motion.h2>

            <motion.p {...fadeUp(0.1)} className="text-white/40 leading-relaxed max-w-xs mb-10 text-sm">
              Estou disponível para novos projetos e oportunidades. Se quiser trabalhar juntos ou só trocar uma ideia, é só chamar.
            </motion.p>

            <motion.a
              {...fadeUp(0.15)}
              href="mailto:kaiomagalhaesxp@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-white text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 group"
            >
              ENTRAR EM CONTATO
              <FontAwesomeIcon icon={faArrowRight} className="w-3 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>


          </div>

          {/* Direita — Social cards */}
          <div className="flex flex-col gap-3">
            {socials.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(0.15 + i * 0.08)}
                whileHover="hover"
                className="group relative flex items-center gap-5 px-6 py-5 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                {/* Borda esquerda animada */}
                <motion.span
                  className="absolute left-0 top-0 h-full w-px bg-white"
                  variants={{ hover: { scaleY: 1 } }}
                  initial={{ scaleY: 0 }}
                  style={{ originY: 0 }}
                  transition={{ duration: 0.25 }}
                />

                <div className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300">
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.3em] text-white/30 mb-0.5 font-mono">{item.label}</span>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300">{item.handle}</span>
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
      </div>


    </section>
  )
}

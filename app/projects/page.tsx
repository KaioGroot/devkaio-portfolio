'use client'

import Navbar from "../components/navbar"
import Mouse from "../components/mouse"
import Footer from "../components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Projeto {
  id: number
  title: string
  description: string
  image: string
  slug: string
  link: string
}

interface ProjetosResponse {
  projects: Projeto[]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
})

export default function ProjectsPage() {
  const [projetos, setProjetos] = useState<ProjetosResponse>({ projects: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projetos")
      .then(r => r.json())
      .then(data => { setProjetos(data); setLoading(false) })
  }, [])

  return (
    <>
      <Navbar />
      <Mouse />

      <main className="bg-black text-white min-h-screen">

        {/* ── HERO ── */}
        <section className="relative px-6 md:px-14 lg:px-20 pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:80px_80px]" />

          <motion.div
            animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] tracking-[0.35em] text-white/30 mb-6 font-mono">
                PROJETOS
              </motion.p>
              <motion.h1
                {...fadeUp(0.05)}
                className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-[-5px]"
              >
                Todos os
                <br />
                <span className="text-white/20" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                  projetos.
                </span>
              </motion.h1>
            </div>
            <motion.p {...fadeUp(0.1)} className="text-white/30 text-sm max-w-xs leading-relaxed lg:mb-4">
              Uma seleção de trabalhos que representam meu processo criativo e técnico.
            </motion.p>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="relative px-6 md:px-14 lg:px-20 pb-32">

          {/* Linha divisória */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full h-px bg-white/[0.07] origin-left mb-16"
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-[32px] border border-white/[0.06] bg-white/[0.02] h-[420px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projetos.projects.map((projeto, index) => (
                <motion.div
                  key={projeto.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/60 backdrop-blur-xl"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={projeto.image}
                      alt={projeto.title}
                      width={900}
                      height={700}
                      className="w-full h-[260px] sm:h-[300px] object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h2 className="font-bold text-2xl text-white mb-3">{projeto.title}</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-7">{projeto.description}</p>
                    <div className="flex items-center justify-between">
                      <a
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group/link"
                      >
                        Ver projeto
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                      <Link
                        href={`/projects/${projeto.slug}`}
                        className="text-[10px] tracking-[0.2em] text-white/20 hover:text-white/50 font-mono transition-colors"
                      >
                        DETALHES →
                      </Link>
                    </div>
                  </div>

                  {/* Smoke */}
                  <div className="absolute -bottom-10 left-0 w-full h-24 bg-black blur-3xl opacity-60" />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  )
}

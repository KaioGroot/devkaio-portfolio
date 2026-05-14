'use client'

import Navbar from "../../components/navbar"
import Mouse from "../../components/mouse"
import Footer from "../../components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

interface Projeto {
  id: number
  title: string
  description: string
  image: string
  slug: string
  link: string
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function ProjetoPage() {
  const { slug } = useParams()
  const [projeto, setProjeto] = useState<Projeto | null>(null)
  const [outros, setOutros] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projetos")
      .then(r => r.json())
      .then(data => {
        const found = data.projects.find((p: Projeto) => p.slug === slug)
        const rest = data.projects.filter((p: Projeto) => p.slug !== slug).slice(0, 3)
        setProjeto(found || null)
        setOutros(rest)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-px h-16 bg-white/20 animate-pulse" />
      </div>
    )
  }

  if (!projeto) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-white">
        <p className="text-white/30 font-mono text-sm tracking-widest">PROJETO NÃO ENCONTRADO</p>
        <Link href="/projects" className="text-white hover:underline text-sm">← Voltar aos projetos</Link>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Mouse />

      <main className="bg-black text-white min-h-screen">

        {/* ── HERO IMAGE ── */}
        <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
          <Image
            src={projeto.image}
            alt={projeto.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

          {/* Voltar */}
          <motion.div
            {...fadeUp(0)}
            className="absolute top-28 left-6 md:left-14 lg:left-20 z-10"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group font-mono tracking-widest"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 group-hover:-translate-x-1 transition-transform" />
              PROJETOS
            </Link>
          </motion.div>

          {/* Título sobre a imagem */}
          <div className="absolute bottom-10 left-6 md:left-14 lg:left-20 z-10">
            <motion.p {...fadeUp(0.05)} className="text-[11px] tracking-[0.35em] text-white/30 mb-4 font-mono">
              PROJETO
            </motion.p>
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-4px] leading-[0.9]"
            >
              {projeto.title}
            </motion.h1>
          </div>
        </section>

        {/* ── CONTEÚDO ── */}
        <section className="relative px-6 md:px-14 lg:px-20 py-24">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:80px_80px]" />

          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-16">

            {/* Esquerda */}
            <div>
              <motion.p
                {...fadeUp(0)}
                className="text-white/50 leading-relaxed text-lg max-w-2xl"
              >
                {projeto.description}
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-px bg-white/[0.07] my-12 origin-left"
              />

              <motion.a
                {...fadeUp(0.15)}
                href={projeto.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-white text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 group"
              >
                VER PROJETO AO VIVO
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3" />
              </motion.a>
            </div>

            {/* Direita — meta */}
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-8">
              <div className="p-6 border border-white/[0.07] bg-white/[0.02] rounded-2xl flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 font-mono">PROJETO</span>
                  <span className="text-white text-sm">{projeto.title}</span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 font-mono">LINK</span>
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white text-sm transition-colors truncate"
                  >
                    {projeto.link}
                  </a>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 font-mono">STATUS</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-sm">Online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── OUTROS PROJETOS ── */}
        {outros.length > 0 && (
          <section className="px-6 md:px-14 lg:px-20 pb-32">
            <div className="max-w-6xl mx-auto">
              <div className="w-full h-px bg-white/[0.07] mb-16" />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[11px] tracking-[0.35em] text-white/30 mb-12 font-mono"
              >
                OUTROS PROJETOS
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6">
                {outros.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                  >
                    <Link href={`/projects/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                      <div className="relative overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={600}
                          height={400}
                          className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{p.title}</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  )
}

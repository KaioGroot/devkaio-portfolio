"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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

export default function Projetos() {
  const [projetos, setProjetos] = useState<ProjetosResponse>({ projects: [] })

  useEffect(() => {
    const pegarDados = async () => {
      const res = await fetch("/api/projetos")
      const data = await res.json()
      setProjetos(data)
    }
    pegarDados()
  }, [])

  return (
    <section
      className="
        relative
        flex
        flex-col
        w-full
        min-h-screen
        overflow-hidden
        bg-black
        px-6
        sm:px-8
        md:px-14
        lg:px-20
        py-24
        font-sans
      "
    >

      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.00]
          bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-200px]
          right-[-100px]
          w-[400px]
          h-[400px]
          bg-white/[0.03]
          blur-3xl
          rounded-full
        "
      />

      {/* HEADER */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          lg:items-end
          justify-between
          gap-10
          w-full
          mb-20
        "
      >
        <div className="text-left">
          <p className="text-sm tracking-[0.35em] text-zinc-500 mb-5">
            PROJETOS
          </p>
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-black
              text-white
              leading-[0.95]
              tracking-[-3px]
              max-w-[700px]
            "
          >
            Alguns projetos
            <br />
            que já desenvolvi.
          </h1>
        </div>

        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="
            self-start
            lg:self-auto
            px-7
            py-4
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            text-white
            hover:bg-white
            hover:text-black
            transition
            duration-300
          "
          href=""
        >
          Ver Todos
        </motion.a>
      </div>

      {/* CARDS */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
          w-full
        "
      >
        {projetos.projects.map((projeto, index) => (
          <motion.div
            key={projeto.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ y: -10 }}
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-zinc-900/60
              backdrop-blur-xl
            "
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <Image
                src={projeto.image}
                alt={projeto.title}
                width={900}
                height={700}
                className="
                  w-full
                  h-[260px]
                  sm:h-[320px]
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-700
                "
              />
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/20
                  to-transparent
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-7 text-left">
              <h1 className="font-bold text-3xl text-white mb-4">
                {projeto.title}
              </h1>
              <p className="text-zinc-500 leading-relaxed mb-7">
                {projeto.description}
              </p>
              <a
                href={projeto.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-white/70
                  hover:text-white
                  transition
                "
              >
                Ver Projeto →
              </a>
            </div>

            {/* SMOKE */}
            <div
              className="
                absolute
                -bottom-10
                left-0
                w-full
                h-24
                bg-black
                blur-3xl
                opacity-60
              "
            />

          </motion.div>
        ))}
      </div>

    </section>
  )
}

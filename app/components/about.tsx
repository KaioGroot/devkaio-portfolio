'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        w-full
        min-h-screen
        bg-black
        overflow-hidden
        px-6
        md:px-16
        py-32
        text-white
      "
    >

      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.02]
          bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          bg-white/[0.03]
          blur-3xl
          rounded-full
        "
      />

      {/* MAIN */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-20
          items-center
        "
      >

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="relative"
        >

          {/* OUTLINED TEXT */}
          <h1
            className="
              absolute
              -top-24
              left-0
              text-[120px]
              md:text-[180px]
              font-black
              tracking-[-10px]
              text-transparent
              opacity-10
              pointer-events-none
              select-none
            "
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.15)',
            }}
          >
            CODE
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              uppercase
              tracking-[0.35em]
              text-zinc-600
              text-sm
              mb-6
            "
          >
            SOBRE MIM
          </p>

          {/* TITLE */}
          <h1
            className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-black
              leading-[0.95]
              tracking-[-4px]
              max-w-[700px]
              mb-8
            "
          >
            Apaixonado por código
            <br />
            e por resolver problemas.
          </h1>

          {/* DESCRIPTION */}
          <div className="space-y-6 max-w-[600px]">

            <p
              className="
                text-zinc-400
                text-lg
                leading-relaxed
              "
            >
              Sou desenvolvedor fullstack focado em criar
              experiências digitais modernas, minimalistas
              e altamente performáticas.
            </p>

            <p
              className="
                text-zinc-500
                leading-relaxed
              "
            >
              Atualmente trabalho com Next.js, React,
              Tailwind CSS e animações avançadas,
              desenvolvendo interfaces premium com foco
              em design elegante e ótima experiência do usuário.
            </p>

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              group
              mt-10
              flex
              items-center
              gap-4
              border
              border-white/10
              bg-white/[0.03]
              hover:bg-white/[0.05]
              transition
              duration-300
              px-7
              py-4
              rounded-full
              backdrop-blur-xl
            "
          >

            <span className="font-medium">
              SAIBA MAIS
            </span>

            <div
              className="
                w-10
                h-10
                rounded-full
                border
                border-white/10
                flex
                items-center
                justify-center
                group-hover:translate-x-1
                transition
              "
            >
              →
            </div>

          </motion.button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="relative"
        >

          {/* BLUR */}
          <div
            className="
              absolute
              inset-0
              bg-white/[0.03]
              blur-3xl
              rounded-[40px]
            "
          />

          {/* CARD */}
          <div
            className="
              relative
              overflow-hidden
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              rounded-[32px]
              p-8
              space-y-6
            "
          >

            {/* SMOKE */}
            <div
              className="
                absolute
                -bottom-20
                left-0
                w-full
                h-40
                bg-black
                blur-3xl
                opacity-80
              "
            />

            {/* CARD ITEM */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
                group
                flex
                items-start
                justify-between
                border
                border-white/5
                bg-black/30
                hover:bg-white/[0.03]
                transition
                rounded-3xl
                p-5
              "
            >

              <div className="flex gap-5">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-xl
                    bg-white/[0.03]
                  "
                >
                  💻
                </div>

                <div>

                  <h1 className="font-semibold text-lg mb-2">
                    Desenvolvimento Web
                  </h1>

                  <p className="text-zinc-500 leading-relaxed">
                    Criação de aplicações modernas
                    e responsivas.
                  </p>

                </div>
              </div>

              <span
                className="
                  text-zinc-600
                  group-hover:translate-x-1
                  transition
                "
              >
                →
              </span>

            </motion.div>

            {/* CARD ITEM */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
                group
                flex
                items-start
                justify-between
                border
                border-white/5
                bg-black/30
                hover:bg-white/[0.03]
                transition
                rounded-3xl
                p-5
              "
            >

              <div className="flex gap-5">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-xl
                    bg-white/[0.03]
                  "
                >
                  🎨
                </div>

                <div>

                  <h1 className="font-semibold text-lg mb-2">
                    UI/UX Design
                  </h1>

                  <p className="text-zinc-500 leading-relaxed">
                    Interfaces modernas, intuitivas
                    e minimalistas.
                  </p>

                </div>
              </div>

              <span
                className="
                  text-zinc-600
                  group-hover:translate-x-1
                  transition
                "
              >
                →
              </span>

            </motion.div>

            {/* CARD ITEM */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
                group
                flex
                items-start
                justify-between
                border
                border-white/5
                bg-black/30
                hover:bg-white/[0.03]
                transition
                rounded-3xl
                p-5
              "
            >

              <div className="flex gap-5">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-xl
                    bg-white/[0.03]
                  "
                >
                  ⚡
                </div>

                <div>

                  <h1 className="font-semibold text-lg mb-2">
                    Performance
                  </h1>

                  <p className="text-zinc-500 leading-relaxed">
                    Código limpo, rápido e otimizado
                    para alta performance.
                  </p>

                </div>
              </div>

              <span
                className="
                  text-zinc-600
                  group-hover:translate-x-1
                  transition
                "
              >
                →
              </span>

            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

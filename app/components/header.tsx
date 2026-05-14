'use client'

import Navbar from "./navbar"
import Link from "next/link"

import { motion } from "framer-motion"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faArrowAltCircleRight,
  faCode,
} from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  return (
    <>
      <Navbar />

      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          fundo
          w-full
          flex
          flex-col
          text-start
          justify-center
          py-20
          px-6
          md:px-14
          lg:px-20
          bg-black
        "
      >

        {/* GRID */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />

        {/* GLOW */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-[20%]
            right-[10%]
            w-[500px]
            h-[500px]
            bg-purple-500/20
            blur-[150px]
            rounded-full
          "
        />

        {/* SECOND GLOW */}
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-[10%]
            left-[10%]
            w-[300px]
            h-[300px]
            bg-blue-500/10
            blur-[120px]
            rounded-full
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl">

          {/* SMALL TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-3 mb-6"
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                flex
                items-center
                justify-center
              "
            >
              <FontAwesomeIcon
                icon={faCode}
                className="text-white w-4"
              />
            </div>

            <h1 className="text-lg text-gray-300">
              Olá, eu sou Kaio
            </h1>

          </motion.div>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <h1
              className="
                text-transparent
                stroke-text
                text-[60px]
                sm:text-[90px]
                md:text-[120px]
                lg:text-[150px]
                font-black
                tracking-[-6px]
                leading-[0.9]
              "
            >
              DESENVOLVEDOR
            </h1>

            <motion.h1
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                text-white
                text-[60px]
                sm:text-[90px]
                md:text-[120px]
                lg:text-[150px]
                font-black
                tracking-[-6px]
                leading-[0.9]
                drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]
              "
            >
              FULLSTACK
            </motion.h1>

          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 max-w-[700px]"
          >

            <p
              className="
                text-gray-400
                text-base
                md:text-lg
                leading-relaxed
              "
            >
              Crio ideias em sistemas fluidos, modernos
              e visualmente impactantes, focando em
              performance, experiência premium e design futurístico.
            </p>

          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap gap-5 mt-10"
          >

            {/* PRIMARY BUTTON */}
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >

              <Link
                href="/about"
                className="
                  group
                  relative
                  px-7
                  py-4
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  overflow-hidden
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-500
                    bg-gradient-to-r
                    from-purple-500/20
                    to-blue-500/20
                  "
                />

                <span className="relative z-10">
                  Projetos
                </span>

                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  className="
                    relative
                    z-10
                    w-[18px]
                    group-hover:translate-x-1
                    transition
                  "
                />

              </Link>

            </motion.div>

            {/* SECOND BUTTON */}
            <motion.a
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              href="#"
              className="
                px-7
                py-4
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                text-white
                hover:bg-white/[0.06]
                transition
                duration-300
              "
            >
              Contato
            </motion.a>

          </motion.div>

        </div>

      </section>
    </>
  )
}

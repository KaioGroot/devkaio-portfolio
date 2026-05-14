"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Mouse from "../components/mouse";
import Navbar from "../components/navbar";

import {
  faCode,
  faRocket,
  faLayerGroup,
  faPalette,
  faBolt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  faReact,
  faJs,
  faNodeJs,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-screen
        bg-black
        px-6
        md:px-14
        lg:px-20
        py-32
        text-white
      "
    >

      <Navbar />
      <Mouse />

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
      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-purple-500/10
          blur-[150px]
        "
      />

      {/* CONTENT */}
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

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: false }}
        >

          {/* SMALL TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              text-sm
              tracking-[0.4em]
              text-purple-400
              mb-6
            "
          >
            SOBRE MIM
          </motion.p>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-[0.95]
              tracking-[-4px]
              mb-8
            "
          >
            Criando experiências
            <span className="text-purple-500">
              {" "}
              modernas
            </span>
            <br />
            para a web.
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="
              text-zinc-400
              text-lg
              leading-relaxed
              max-w-[650px]
            "
          >
            Sou desenvolvedor frontend especializado em criar
            interfaces premium com visual cinematográfico,
            animações fluidas e experiências modernas que
            realmente geram impacto.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 1,
            }}
            className="
              text-zinc-500
              text-lg
              leading-relaxed
              mt-6
              max-w-[650px]
            "
          >
            Utilizo tecnologias modernas como Next.js,
            React, TypeScript e Framer Motion para construir
            websites rápidos, elegantes e focados em
            experiência premium.
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
            }}
            className="mt-10"
          >

            <motion.a
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              href="#"
              className="
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-full
                bg-purple-600
                hover:bg-purple-500
                transition
                duration-300
                font-semibold
              "
            >
              Saiba Mais

              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-4"
              />

            </motion.a>

          </motion.div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: false }}
          className="relative"
        >

          {/* IMAGE CONTAINER */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              bg-zinc-900/50
              backdrop-blur-2xl
            "
          >

            {/* IMAGE */}
            <Image
              src="/fundo.png"
              alt="Kaio"
              width={1200}
              height={1200}
              className="
                w-full
                h-[700px]
                object-cover
                object-top
              "
            />

            {/* OVERLAY */}
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

          {/* FLOATING CARDS */}

          {/* CARD 1 */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              top-10
              -left-10
              backdrop-blur-2xl
              bg-white/[0.04]
              border
              border-white/10
              rounded-3xl
              p-5
              w-[220px]
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-purple-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <FontAwesomeIcon
                  icon={faPalette}
                  className="w-5 text-purple-400"
                />
              </div>

              <div>
                <h1 className="font-semibold">
                  UI Premium
                </h1>

                <p className="text-sm text-zinc-400">
                  Interfaces modernas
                </p>
              </div>

            </div>

          </motion.div>

          {/* CARD 2 */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              bottom-10
              -right-10
              backdrop-blur-2xl
              bg-white/[0.04]
              border
              border-white/10
              rounded-3xl
              p-5
              w-[250px]
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-purple-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <FontAwesomeIcon
                  icon={faRocket}
                  className="w-5 text-purple-400"
                />
              </div>

              <div>
                <h1 className="font-semibold">
                  Alta Performance
                </h1>

                <p className="text-sm text-zinc-400">
                  Experiência ultra fluida
                </p>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* STACKS */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        viewport={{ once: false }}
        className="
          relative
          z-10
          mt-32
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          max-w-6xl
          mx-auto
        "
      >

        {[
          {
            icon: faReact,
            title: "React",
          },
          {
            icon: faJs,
            title: "JavaScript",
          },
          {
            icon: faNodeJs,
            title: "Node.js",
          },
          {
            icon: faFigma,
            title: "Figma",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
            }}
            className="
              backdrop-blur-xl
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
              flex
              flex-col
              items-center
              justify-center
              gap-5
            "
          >

            <FontAwesomeIcon
              icon={item.icon}
              className="
                text-5xl
                text-purple-400
              "
            />

            <h1
              className="
                text-lg
                font-semibold
              "
            >
              {item.title}
            </h1>

          </motion.div>
        ))}

      </motion.div>

    </section>
  );
}

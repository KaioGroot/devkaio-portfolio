'use client'

import { motion } from 'framer-motion'
import { useEffect,useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faReact,
  faNodeJs,
  faGithub,
  faDocker,
  faFigma,
  faGitAlt,
  faHtml5,
  faCss3Alt,
  faJs,
  faPython,
} from '@fortawesome/free-brands-svg-icons'

import {
  faDatabase,
  faServer,
  faCode,
  faFire,
} from '@fortawesome/free-solid-svg-icons'

const stacks = [
  {
    icon: faReact,
    name: 'React',
  },
  {
    icon: faCode,
    name: 'Next.js',
  },
  {
    icon: faCode,
    name: 'TypeScript',
  },
  {
    icon: faCss3Alt,
    name: 'Tailwind',
  },
  {
    icon: faNodeJs,
    name: 'Node.js',
  },
  {
    icon: faDatabase,
    name: 'PostgreSQL',
  },
  {
    icon: faFire,
    name: 'Firebase',
  },
  {
    icon: faCode,
    name: 'Framer',
  },
  {
    icon: faGithub,
    name: 'GitHub',
  },
  {
    icon: faDocker,
    name: 'Docker',
  },
  {
    icon: faFigma,
    name: 'Figma',
  },
  {
    icon: faGitAlt,
    name: 'Git',
  },
  {
    icon: faHtml5,
    name: 'HTML',
  },
  {
    icon: faCss3Alt,
    name: 'CSS',
  },
  {
    icon: faJs,
    name: 'JavaScript',
  },
  {
    icon: faPython,
    name: 'Python',
  },
  {
    icon: faDatabase,
    name: 'MongoDB',
  },
  {
    icon: faServer,
    name: 'Vercel',
  },
]

export default function Stack() {


  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotate, setRotate] = useState(0)


useEffect(() => {

  const interval = setInterval(() => {
    setPosX(Math.random() * 200 - 100)
    setPosY(Math.random() * 200 - 100)
    setRotate(Math.random() * 360 - 180)
  }, 2520)

  return () => clearInterval(interval)

}, [ posX, posY ])



  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        flex
        items-center
        justify-center
        px-6
        py-32
      "
    >

      {/* BACKGROUND */}
      <motion.div
  animate={{
    x: posX,
    y: posY,
    rotate: rotate
  }}
  transition={{
    duration: 2,
    ease: 'easeInOut',
  }}
  className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[700px]
    h-[700px]
    bg-purple-500/20
    rounded-full
    blur-[180px]
    pointer-events-none
  "
/>

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
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[700px]
          h-[700px]
          bg-purple-500/20
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          flex
          flex-col
          items-center
        "
      >

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: false }}
          className="
            text-5xl
            md:text-7xl
            font-light
            tracking-[-4px]
            text-white
            mb-20
            text-center
          "
        >
          TECH STACK
        </motion.h1>

        {/* GRID STACK */}
        <div
          className="
            relative
            grid
            grid-cols-3
            sm:grid-cols-4
            md:grid-cols-5
            lg:grid-cols-6
            gap-5
          "
        >

          {stacks.map((stack, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: false }}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="
                group
                relative
                w-[100px]
                h-[100px]
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                flex
                flex-col
                items-center
                justify-center
                gap-3
                overflow-hidden
                transition
                duration-300
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-500
                  bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_70%)]
                "
              />

              {/* ICON */}
              <div
                className="
                  relative
                  z-10
                  text-3xl
                  text-white
                "
              >
                <FontAwesomeIcon icon={stack.icon} />
              </div>

              {/* NAME */}
              <p
                className="
                  relative
                  z-10
                  text-sm
                  text-zinc-400
                "
              >
                {stack.name}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}

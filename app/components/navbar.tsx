'use client'

import React from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBurger,
  faCode,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faLinkedin,
  faInstagram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Projetos", href: "/projects" },
  { label: "Contato", href: "/contact" },
];

const socials = [
  { icon: faGithub, href: "#" },
  { icon: faLinkedin, href: "#" },
  { icon: faInstagram, href: "#" },
  { icon: faDiscord, href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          top-5
          left-1/2
          -translate-x-1/2
          z-50
          w-[92%]
          max-w-5xl
        "
      >

        {/* subtle glow */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-white/[0.02]
            blur-xl
            pointer-events-none
          "
        />

        {/* navbar body */}
        <div
          className="
            relative
            flex
            items-center
            justify-between
            px-6
            md:px-8
            py-3
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.03]
            backdrop-blur-xl
          "
          style={{
            boxShadow: "0 4px 30px rgba(0,0,0,0.12)",
          }}
        >

          {/* LOGO */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              flex
              items-center
              gap-3
              select-none
            "
          >

            <div
              className="
                w-8
                h-8
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                flex
                items-center
                justify-center
              "
            >
              <FontAwesomeIcon
                icon={faCode}
                className="w-3 text-white/70"
              />
            </div>

            <h1
              className="
                text-sm
                uppercase
                tracking-[0.25em]
                text-white/70
                font-medium
              "
            >
              DevKaio
            </h1>

          </motion.div>

          {/* LINKS */}
          <ul
            className="
              hidden
              md:flex
              items-center
              gap-1
            "
          >

            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                }}
              >

                <NavLink href={link.href}>
                  {link.label}
                </NavLink>

              </motion.li>
            ))}

          </ul>

          {/* SOCIALS */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-4
            "
          >

            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{
                  y: -2,
                  scale: 1.08,
                }}
                className="
                  text-white/40
                  hover:text-white/80
                  transition
                  duration-300
                "
              >

                <FontAwesomeIcon
                  icon={social.icon}
                  className="w-4"
                />

              </motion.a>
            ))}

          </div>

          {/* MOBILE BUTTON */}
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setIsOpen(!isOpen)}
            className="
              md:hidden
              text-white/70
            "
          >

            <AnimatePresence mode="wait">

              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <FontAwesomeIcon
                  icon={isOpen ? faXmark : faBurger}
                  className="w-5"
                />

              </motion.div>

            </AnimatePresence>

          </motion.button>

        </div>

      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0
              z-40
              md:hidden
              flex
              items-center
              justify-center
              bg-black/80
              backdrop-blur-2xl
            "
          >

            {/* glow */}
            <div
              className="
                absolute
                w-[300px]
                h-[300px]
                rounded-full
                bg-white/[0.03]
                blur-3xl
              "
            />

            <ul
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                gap-8
              "
            >

              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      text-3xl
                      font-light
                      tracking-[0.2em]
                      uppercase
                      text-white/80
                      hover:text-white
                      transition
                    "
                  >
                    {link.label}
                  </Link>

                </motion.li>
              ))}

              {/* SOCIALS MOBILE */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="
                  flex
                  gap-6
                  mt-6
                "
              >

                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="
                      text-white/40
                      hover:text-white/80
                      transition
                    "
                  >

                    <FontAwesomeIcon
                      icon={social.icon}
                      className="w-5"
                    />

                  </a>
                ))}

              </motion.div>

            </ul>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

/* NAV LINK */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {

  return (
    <Link
      href={href}
      className="
        relative
        px-4
        py-2
        rounded-full
        text-sm
        text-white/45
        hover:text-white/90
        transition
        duration-300
        hover:bg-white/[0.04]
      "
    >
      {children}
    </Link>
  );
}

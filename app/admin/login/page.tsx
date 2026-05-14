'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Mouse from "@/app/components/mouse"

export default function AdminLogin() {
  const router = useRouter()
  const [user, setUser]       = useState("")
  const [pass, setPass]       = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)
  const [shake, setShake]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simula delay de autenticação
    await new Promise(r => setTimeout(r, 800))

    if (user === "kaio" && pass === "chapaleirossd") {
      // Salva sessão simples no sessionStorage
      sessionStorage.setItem("admin_auth", "true")
      router.push("/admin")
    } else {
      setError("Usuário ou senha incorretos.")
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden relative">
      <Mouse />
      {/* Grade */}
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

      {/* Glow */}
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={shake
          ? { x: [-12, 12, -8, 8, -4, 4, 0], opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
        }
        transition={{ duration: shake ? 0.5 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header do card */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCode} className="w-4 text-white/50" />
            </div>
            <span className="text-white/30 font-mono text-xs tracking-[0.3em]">DEVKAIO</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-[-2px]">Área restrita</h1>
          <p className="text-white/25 text-sm">Acesso exclusivo ao painel administrativo.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Usuário */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.3em] text-white/30 font-mono">USUÁRIO</label>
            <input
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoComplete="username"
              placeholder="usuário"
              className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/25 text-white placeholder-white/20 px-5 py-4 text-sm outline-none transition-colors duration-300 font-mono"
              style={{ borderRadius: 0 }}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.3em] text-white/30 font-mono">SENHA</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e => setPass(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/25 text-white placeholder-white/20 px-5 py-4 pr-12 text-sm outline-none transition-colors duration-300 font-mono"
                style={{ borderRadius: 0 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
              >
                <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="w-4" />
              </button>
            </div>
          </div>

          {/* Erro */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400/80 text-xs font-mono tracking-wide"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Botão */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="mt-2 w-full flex items-center justify-center gap-3 px-7 py-4 border border-white/20 text-white text-sm tracking-widest font-mono hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 bg-white rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </span>
            ) : (
              <>
                ENTRAR
                <FontAwesomeIcon icon={faArrowRight} className="w-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        {/* Linha bottom */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-[10px] text-white/15 font-mono tracking-widest text-center">
            ACESSO RESTRITO — NÃO AUTORIZADO? VOLTE PARA O INÍCIO.
          </p>
        </div>
      </motion.div>
    </main>
  )
}

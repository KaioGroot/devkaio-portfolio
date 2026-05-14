'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCode, faFolderOpen, faUser, faRightFromBracket,
  faPlus, faArrowUpRightFromSquare, faXmark,
  faHashtag, faFileLines, faLink, faUpload, faCheck,
  faPencil, faTrash,
} from "@fortawesome/free-solid-svg-icons"
import Mouse from "../components/mouse"

// ── Tipos ──────────────────────────────────────────────────────────────────

interface Projeto {
  id: number
  title: string
  description: string
  image: string
  slug: string
  link: string
}

interface Form {
  title: string
  description: string
  image: string
  slug: string
  link: string
}

const EMPTY_FORM: Form = { title: "", description: "", image: "", slug: "", link: "" }

const fadeUp = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },

  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },

  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
})

const toSlug = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

// ── Field ──────────────────────────────────────────────────────────────────

function Field({
  icon, label, hint, value, onChange, multiline = false,
}: {
  icon: any
  label: string
  hint: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  return (
    <motion.div layout className="flex flex-col gap-2">
      <motion.div
        animate={{ color: focused ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-mono"
      >
        <FontAwesomeIcon icon={icon} className="w-3" />
        {label}
      </motion.div>

      <div className="relative">
        <motion.div
          animate={{
            borderColor: focused
              ? "rgba(255,255,255,0.3)"
              : filled
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.06)",
          }}
          transition={{ duration: 0.2 }}
          className="relative border"
        >
          <motion.div
            className="absolute top-0 left-0 h-px bg-white origin-left"
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />

          {multiline ? (
            <textarea
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={hint}
              rows={4}
              className="w-full bg-transparent px-5 py-4 text-sm text-white placeholder-white/15 outline-none resize-none font-sans"
            />
          ) : (
            <input
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={hint}
              className="w-full bg-transparent px-5 py-4 text-sm text-white placeholder-white/15 outline-none font-sans"
            />
          )}

          <AnimatePresence>
            {filled && !focused && !multiline && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <FontAwesomeIcon icon={faCheck} className="w-3 text-emerald-400/60" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 -bottom-2 h-6 bg-white/5 blur-xl pointer-events-none"
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

// ── Modal (create / edit) ──────────────────────────────────────────────────

function ProjectModal({
  mode,
  initial,
  onClose,
  onSave,
}: {
  mode: "create" | "edit"
  initial: Form
  onClose: () => void
  onSave: (form: Form) => Promise<void>
}) {
  const [form, setForm] = useState<Form>(initial)
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const setTitle = (v: string) =>
    setForm(f => ({
      ...f,
      title: v,
      slug:
        mode === "create" && (f.slug === toSlug(f.title) || f.slug === "")
          ? toSlug(v)
          : f.slug,
    }))

  const valid = form.title && form.description && form.link && form.image && form.slug

  const handleSubmit = async () => {
    if (!valid) return
    setStatus("loading")
    await onSave(form)
    setStatus("success")
    await new Promise(r => setTimeout(r, 700))
    onClose()
  }

  const isEdit = mode === "edit"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl z-10 max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Linha topo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{
            background: isEdit
              ? "linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-white/[0.06]">
          <div>
            <p className="text-[10px] tracking-[0.35em] font-mono mb-1"
              style={{ color: isEdit ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.25)" }}>
              {isEdit ? "EDITAR PROJETO" : "NOVO PROJETO"}
            </p>
            <h2 className="text-xl font-black tracking-[-1px] text-white">
              {isEdit ? "Editar projeto" : "Cadastrar projeto"}
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3.5" />
          </motion.button>
        </div>

        {/* Campos */}
        <div className="px-8 py-6 flex flex-col gap-5">
          <Field icon={faHashtag}   label="TÍTULO"    hint="Nome do projeto"        value={form.title}       onChange={setTitle} />
          <Field icon={faFileLines} label="DESCRIÇÃO" hint="Descreva o projeto..."  value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} multiline />
          <Field icon={faLink}      label="LINK"      hint="https://meusite.com"    value={form.link}        onChange={v => setForm(f => ({ ...f, link: v }))} />
          <Field icon={faUpload}    label="IMAGEM"    hint="/fotos/projeto.png"     value={form.image}       onChange={v => setForm(f => ({ ...f, image: v }))} />

          <div className="flex flex-col gap-2">
            <Field icon={faHashtag} label="SLUG" hint="meu-projeto" value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} />
            <AnimatePresence>
              {form.slug && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-white/20 font-mono pl-1"
                >
                  /projects/<span className="text-white/40">{form.slug}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <button
            onClick={onClose}
            className="text-xs text-white/25 hover:text-white/50 font-mono tracking-widest transition-colors"
          >
            CANCELAR
          </button>

          <motion.button
            onClick={handleSubmit}
            disabled={!valid || status !== "idle"}
            whileHover={{ scale: valid ? 1.02 : 1 }}
            whileTap={{ scale: valid ? 0.97 : 1 }}
            className="relative flex items-center gap-3 px-7 py-3 border text-white text-xs tracking-widest font-mono transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
            style={{
              borderColor: status === "success"
                ? "rgba(52,211,153,0.4)"
                : isEdit
                ? "rgba(251,191,36,0.3)"
                : "rgba(255,255,255,0.2)",
              backgroundColor: status === "success" ? "rgba(52,211,153,0.1)" : "transparent",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />

            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.span key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-1 h-1 bg-white rounded-full" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </motion.span>
              ) : status === "success" ? (
                <motion.span key="ok" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-emerald-400">
                  <FontAwesomeIcon icon={faCheck} className="w-3" />
                  {isEdit ? "SALVO" : "CRIADO"}
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  {isEdit ? "SALVAR" : "CADASTRAR"}
                  <FontAwesomeIcon icon={isEdit ? faCheck : faPlus} className="w-3" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Confirm Delete ─────────────────────────────────────────────────────────

function ConfirmDelete({
  projeto,
  onConfirm,
  onCancel,
}: {
  projeto: Projeto
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm p-8 flex flex-col gap-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(239,68,68,0.2)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Linha topo vermelha */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 right-0 h-px bg-red-500/40 origin-left"
        />

        <div className="flex flex-col gap-2">
          <p className="text-[10px] tracking-[0.35em] text-red-400/60 font-mono">ATENÇÃO</p>
          <h3 className="text-lg font-black text-white">Excluir projeto?</h3>
          <p className="text-white/35 text-sm leading-relaxed">
            Você está prestes a excluir <span className="text-white/70">"{projeto.title}"</span>. Essa ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-white/10 text-white/30 hover:text-white hover:border-white/25 text-xs font-mono tracking-widest transition-colors"
          >
            CANCELAR
          </button>
          <motion.button
            onClick={onConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 text-xs font-mono tracking-widest transition-colors"
          >
            EXCLUIR
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Admin Page ─────────────────────────────────────────────────────────────

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; projeto: Projeto }
  | { type: "delete"; projeto: Projeto }

export default function AdminPage() {
  const router = useRouter()
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState<ModalState>({ type: "closed" })

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (!auth) { router.replace("/admin/login"); return }
    fetch("/api/projetos")
      .then(r => r.json())
      .then(data => { setProjetos(data.projects); setLoading(false) })
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  // Criar
  const handleCreate = async (form: Form) => {
    const res = await fetch("/api/projetos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const novo = await res.json()
    setProjetos(prev => [...prev, novo])
  }

  // Editar
  const handleEdit = async (form: Form) => {
    if (modal.type !== "edit") return
    const id = modal.projeto.id
    const res = await fetch("/api/projetos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    })
    const atualizado = await res.json()
    setProjetos(prev => prev.map(p => p.id === id ? atualizado : p))
  }

  // Deletar
  const handleDelete = async () => {
    if (modal.type !== "delete") return
    const id = modal.projeto.id
    await fetch("/api/projetos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    setProjetos(prev => prev.filter(p => p.id !== id))
    setModal({ type: "closed" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-16 bg-white/30" />
      </div>
    )
  }

  return (
    <>
      <Mouse />

      <main className="min-h-screen bg-[#04060f] text-white font-sans">

        {/* Grade */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Modais */}
        <AnimatePresence>
          {modal.type === "create" && (
            <ProjectModal
              key="create"
              mode="create"
              initial={EMPTY_FORM}
              onClose={() => setModal({ type: "closed" })}
              onSave={handleCreate}
            />
          )}
          {modal.type === "edit" && (
            <ProjectModal
              key="edit"
              mode="edit"
              initial={{
                title: modal.projeto.title,
                description: modal.projeto.description,
                image: modal.projeto.image,
                slug: modal.projeto.slug,
                link: modal.projeto.link,
              }}
              onClose={() => setModal({ type: "closed" })}
              onSave={handleEdit}
            />
          )}
          {modal.type === "delete" && (
            <ConfirmDelete
              key="delete"
              projeto={modal.projeto}
              onConfirm={handleDelete}
              onCancel={() => setModal({ type: "closed" })}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/[0.06] bg-black/40 backdrop-blur-xl flex flex-col z-20">
          <div className="px-6 py-6 border-b border-white/[0.06] flex items-center gap-3">
            <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCode} className="w-3.5 text-white/50" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">DevKaio</p>
              <p className="text-white/25 text-[10px] font-mono tracking-widest">ADMIN</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 p-4 flex-1">
            {[
              { icon: faFolderOpen, label: "Projetos", active: true },
              { icon: faUser,       label: "Perfil",   active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-left ${
                  item.active
                    ? "bg-white/[0.06] text-white border border-white/[0.08]"
                    : "text-white/30 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/[0.06]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-colors w-full"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
              Sair
            </button>
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="pl-64 relative z-10">

          {/* Header */}
          <motion.header
            {...fadeUp(0)}
            className="px-10 py-8 border-b border-white/[0.06] flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/25 font-mono mb-1">PAINEL</p>
              <h1 className="text-2xl font-black tracking-[-1px]">Projetos</h1>
            </div>

            <motion.button
              onClick={() => setModal({ type: "create" })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white text-xs tracking-widest font-mono hover:bg-white hover:text-black transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
              />
              <FontAwesomeIcon icon={faPlus} className="w-3" />
              NOVO PROJETO
            </motion.button>
          </motion.header>

          {/* Stats */}
          <div className="px-10 py-8 grid grid-cols-3 gap-4">
            {[
              { label: "TOTAL DE PROJETOS", value: projetos.length },
              { label: "ONLINE",            value: projetos.length },
              { label: "EM DESTAQUE",       value: 3 },
            ].map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 + i * 0.05)}
                className="p-6 border border-white/[0.07] bg-white/[0.02] rounded-2xl flex flex-col gap-2"
              >
                <span className="text-[10px] tracking-[0.3em] text-white/25 font-mono">{s.label}</span>
                <motion.span
                  key={s.value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black text-white"
                >
                  {s.value}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Tabela */}
          <div className="px-10 pb-16">
            <motion.div {...fadeUp(0.2)} className="border border-white/[0.07] rounded-2xl overflow-hidden">

              {/* Cabeçalho */}
              <div className="grid grid-cols-[1fr_2fr_auto] gap-4 px-6 py-4 border-b border-white/[0.07] bg-white/[0.02]">
                {["TÍTULO", "DESCRIÇÃO", "AÇÕES"].map((h, i) => (
                  <span key={i} className="text-[10px] tracking-[0.3em] text-white/25 font-mono">{h}</span>
                ))}
              </div>

              <AnimatePresence>
                {projetos.map((projeto, i) => (
                  <motion.div
                    key={projeto.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, height: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                    className="grid grid-cols-[1fr_2fr_auto] gap-4 px-6 py-5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-sm font-medium">{projeto.title}</span>
                      <span className="text-white/20 text-[10px] font-mono">{projeto.slug}</span>
                    </div>

                    <p className="text-white/35 text-xs leading-relaxed line-clamp-2">{projeto.description}</p>

                    {/* Ações */}
                    <div className="flex gap-2">
                      {/* Ver */}
                      <motion.a
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/25 hover:text-white hover:border-white/30 transition-colors rounded-lg"
                        title="Ver projeto"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3" />
                      </motion.a>

                      {/* Editar */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setModal({ type: "edit", projeto })}
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/25 hover:text-amber-400 hover:border-amber-400/30 transition-colors rounded-lg"
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faPencil} className="w-3" />
                      </motion.button>

                      {/* Deletar */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setModal({ type: "delete", projeto })}
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-400/30 transition-colors rounded-lg"
                        title="Excluir"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

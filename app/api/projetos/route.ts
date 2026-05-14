import { NextResponse } from "next/server"
import projetos from "./projetos.json"
import path from "path"
import fs from "fs"


const filePath = path.join(process.cwd(), "app/api/projetos/projetos.json")


type Projeto = {
  id: number
  title: string
  description: string
  link: string
  slug: string
  image: string
}


export async function GET() {

  //se não encontrar o projeto retornar erro
  if (!projetos) {
    return NextResponse.json({ error: "Nenhum projeto encontrado" }, { status: 404 })
  }

  return NextResponse.json(projetos)
}



export async function POST(request: Request) {
  const data = await request.json()

  //verificar os dados que vem do form
  if (!data.title || !data.description || !data.image || !data.slug || !data.link) {
    return NextResponse.json({ error: "Todos os campos devem ser preenchidos" }, { status: 400 })
  }else{
    //adicionar o novo projeto ao  json
    const file = fs.readFileSync(filePath, "utf-8")
    const projetos = JSON.parse(file)

      // criar novo projeto
    const novoProjeto = {
    id: Date.now(),
    ...data,
  }

  // adicionar
    projetos.projects.push(novoProjeto)
    fs.writeFileSync(filePath, JSON.stringify(projetos, null, 2))
  }

  return NextResponse.json(data)
}



export async function PUT(request: Request) {
  const data = await request.json()

  //verificar os dados que vem do form
  if (!data.title || !data.description || !data.image || !data.slug || !data.link) {
    return NextResponse.json({ error: "Todos os campos devem ser preenchidos" }, { status: 400 })
  }else{
    //adicionar o novo projeto ao  json
    const file = fs.readFileSync(filePath, "utf-8")
    const projetos = JSON.parse(file)

    // atualizar projeto
    const projeto = projetos.projects.find((p:Projeto) => p.id === data.id)
    if (!projeto) {
      return NextResponse.json({ error: "Projeto nao encontrado" }, { status: 404 })
    }
    projeto.title = data.title
    projeto.description = data.description
    projeto.image = data.image
    projeto.slug = data.slug
    projeto.link = data.link

    fs.writeFileSync(filePath, JSON.stringify(projetos, null, 2))
  }

  return NextResponse.json(data)
}


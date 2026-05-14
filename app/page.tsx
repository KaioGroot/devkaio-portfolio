'use client';
import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import Projetos from "./components/projetos";
import Stack from "./components/stack";
import Contato from "./components/contato"
import Footer from "./components/footer";
import Mouse from "./components/mouse";
import { useState, useEffect } from "react";


export default function Home() {


  return (
    <>
      <div className="flex flex-col flex-1  font-sans dark:bg-black ">
        <Header />
        <About />
        <Projetos />
        <Stack />
        <Contato  />
        <Footer />
        <Mouse />
      </div>
    </>
  );
}

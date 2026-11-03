import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Projects } from "@/components/site/projects";
import { Solutions } from "@/components/site/solutions";
import { buildStructuredData, serializeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildStructuredData()) }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <Solutions />
        <Projects />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Stats from "./_components/Stats";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

export default function Home() {
    return (
        <div className="bg-[#050505] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-400">
            <Header />
            <main>
                <Hero />
                <Stats />
                <Features />
                <CTA />
            </main>
            <Footer/>
        </div>
    )
}
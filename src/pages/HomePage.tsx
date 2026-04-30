import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Blog } from '../components/Blog';
import { useIsMobile } from '../hooks/useIsMobile';

export function HomePage() {
    const isMobile = useIsMobile(1024);

    if (isMobile) {
        return (
            <div className="relative bg-ink">
                <div className="relative z-10">
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                    <Projects />
                    <div className="border-b-8 border-ink">
                        <Blog />
                    </div>
                    <Contact />
                </div>
            </div>
        );
    }

    return (
        <div className="relative pb-[100vh]">
            {/* The sticky curtain background layer */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="sticky top-0 h-screen w-full flex flex-col justify-end overflow-hidden pointer-events-auto">
                    <Contact />
                </div>
            </div>

            {/* The "Curtain" - All content that scrolls up to reveal Contact */}
            <div className="relative z-10 bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <div className="border-b-8 border-ink">
                    <Blog />
                </div>
            </div>
            
            {/* Spacer anchor for navbar links - exactly where the reveal begins */}
            <div id="contact" className="absolute bottom-[100vh] w-full h-px pointer-events-none" />
        </div>
    );
}

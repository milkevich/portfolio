import type { CSSProperties } from 'react'
import './Home.css'
import hero from '../../assets/hero.webp'
import Footer from '../../shared/UI/Footer'
import { RouteveilLink } from 'routeveil/react-router'

const revealStyle = (index: number): CSSProperties => ({
    animationDelay: `${index * 80}ms`,
})

function Home() {
    return (
        <main className="page-container">
            <div className="main-content-container">
                <header className="home-reveal" style={revealStyle(0)}>
                    <div className="header-container">
                        <img src={hero} alt="Gleb Milkevich" />
                    </div>

                    <div className="section-container">
                        <h1>Gleb Milkevich</h1>
                        <p>Design Engineer</p>
                    </div>
                </header>

                <section className="section-container home-reveal" style={revealStyle(1)} aria-labelledby="today-heading">
                    <h2 id="today-heading">Today</h2>
                    <p>
                        I design and build thoughtful interfaces for ambitious products.
                        Currently a founding engineer at{' '}
                        <a href="https://flickhuntapp.com/">Flickhunt</a> and building{' '}
                        <a href="https://routeveil.dev">Routeveil</a>, an open-source React
                        library.
                    </p>
                </section>

                <section className="section-container home-reveal" style={revealStyle(2)} aria-labelledby="projects-heading">
                    <h2 id="projects-heading">Projects</h2>
                    <RouteveilLink transition={{
                        exit: "fade"
                    }} to="/projects/routeveil">Routeveil</RouteveilLink>
                    <RouteveilLink transition={{
                        exit: "fade"
                    }} to="/projects/plainframe-ui">Plainframe UI</RouteveilLink>
                </section>

                <section className="section-container home-reveal" style={revealStyle(3)} aria-labelledby="connect-heading">
                    <h2 id="connect-heading">Connect</h2>
                    <a href="mailto:glebmilkevich@icloud.com">Email</a>
                    <a href="https://www.linkedin.com/in/milkevich">LinkedIn</a>
                    <a href="https://github.com/milkevich">GitHub</a>
                </section>

                <section className="section-container home-reveal" style={revealStyle(4)} aria-labelledby="more-heading">
                    <h2 id="more-heading">More</h2>
                    <RouteveilLink transition={{
                        name: "dissolve",
                        color: "var(--foreground-color)"
                    }} to="/gallery">Gallery</RouteveilLink>
                    <a href="https://open.spotify.com/user/313wywgkzppbmdxf632b3l34h7nu">
                        Spotify
                    </a>
                </section>
            </div>

            <div className="home-reveal" style={revealStyle(5)}>
                <Footer />
            </div>
        </main>
    )
}

export default Home

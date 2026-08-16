import { useState, type CSSProperties } from 'react'
import './Home.css'
import hero from '../../assets/hero.webp'
import Footer from '../../shared/UI/Footer'
import { RouteveilLink } from 'routeveil/react-router'
import CV from '../../assets/CV_Gleb_Milkevich.pdf'
import flickhuntLogo from '../../assets/flickhunt-logo.webp'
import routeveilLogo from '../../assets/projects-assets/routeveil-logo.svg'
import flickhuntPreview from '../../assets/flickhunt-preview.png'
import routeveilPreview from '../../assets/routeveil-preview.png'

const revealStyle = (index: number): CSSProperties => ({
    animationDelay: `${index * 100}ms`,
})

type Preview = 'flickhunt' | 'routeveil' | null

function Home() {
    const [showPreview, setShowPreview] = useState<Preview>(null)

    return (
        <main className="page-container">
            <div className="main-content-container">
                <header
                    className="home-reveal"
                    style={revealStyle(0)}
                >
                    <div className="header-container">
                        <img src={hero} alt="Gleb Milkevich" />
                    </div>

                    <div className="section-container">
                        <h1>Gleb Milkevich</h1>
                        <p>Design Engineer</p>
                    </div>
                </header>

                <section
                    className="section-container home-reveal"
                    style={revealStyle(1)}
                    aria-labelledby="today-heading"
                >
                    <h2 id="today-heading">Today</h2>

                    <p>
                        I design and build polished interfaces with React and TypeScript.
                        Currently a founding engineer at{' '}

                        <span
                            className="preview-link"
                            onMouseEnter={() => setShowPreview('flickhunt')}
                            onMouseLeave={() => setShowPreview(null)}
                        >
                            <a href="https://flickhuntapp.com/">
                                <img
                                    src={flickhuntLogo}
                                    alt="Flickhunt Logo"
                                />
                                Flickhunt
                            </a>

                            <div
                                className={`link-preview ${
                                    showPreview === 'flickhunt'
                                        ? 'link-preview-visible'
                                        : ''
                                }`}
                            >
                                <div className="link-preview-image">
                                    <img
                                        src={flickhuntPreview}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </span>

                        {' '}and building{' '}

                        <span
                            className="preview-link"
                            onMouseEnter={() => setShowPreview('routeveil')}
                            onMouseLeave={() => setShowPreview(null)}
                        >
                            <a href="https://routeveil.dev">
                                <img
                                    src={routeveilLogo}
                                    alt="Routeveil Logo"
                                />
                                Routeveil
                            </a>

                            <div
                                className={`link-preview ${
                                    showPreview === 'routeveil'
                                        ? 'link-preview-visible'
                                        : ''
                                }`}
                            >
                                <div className="link-preview-image">
                                    <img
                                        src={routeveilPreview}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </span>

                        , a transitions engine for React Router.
                    </p>
                </section>

                <section
                    className="section-container home-reveal"
                    style={revealStyle(2)}
                    aria-labelledby="projects-heading"
                >
                    <h2 id="projects-heading">Projects</h2>

                    <RouteveilLink
                        transition={{
                            exit: 'fade',
                        }}
                        to="/projects/routeveil"
                    >
                        Routeveil
                    </RouteveilLink>

                    <RouteveilLink
                        transition={{
                            exit: 'fade',
                        }}
                        to="/projects/plainframe-ui"
                    >
                        Plainframe UI
                    </RouteveilLink>
                </section>

                <section
                    className="section-container home-reveal"
                    style={revealStyle(3)}
                    aria-labelledby="connect-heading"
                >
                    <h2 id="connect-heading">Connect</h2>

                    <a href="mailto:glebmilkevich@icloud.com">
                        Email
                    </a>

                    <a href="https://www.linkedin.com/in/milkevich">
                        LinkedIn
                    </a>

                    <a href="https://github.com/milkevich">
                        GitHub
                    </a>
                </section>

                <section
                    className="section-container home-reveal"
                    style={revealStyle(4)}
                    aria-labelledby="more-heading"
                >
                    <h2 id="more-heading">More</h2>

                    <a
                        href={CV}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Resume
                    </a>

                    <RouteveilLink
                        transition={{
                            name: 'dissolve',
                            color: 'var(--foreground-color)',
                        }}
                        to="/gallery"
                    >
                        Gallery
                    </RouteveilLink>

                    <a href="https://open.spotify.com/user/313wywgkzppbmdxf632b3l34h7nu">
                        Spotify
                    </a>
                </section>
            </div>

            <div
                className="home-reveal"
                style={revealStyle(5)}
            >
                <Footer />
            </div>
        </main>
    )
}

export default Home
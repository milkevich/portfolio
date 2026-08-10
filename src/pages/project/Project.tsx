import type { ReactNode } from "react"
import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ChevronsUpDown, X } from "lucide-react"
import { useParams } from "react-router-dom"
import { RouteveilLink } from "routeveil/react-router"

import projects, {
    type ProjectMedia,
    type ProjectSection,
} from "./projects"
import Footer from "../../shared/UI/Footer"
import "./Project.css"

const INDEX_CLOSED_WIDTH = 135
const INDEX_OPEN_WIDTH = 250
const INDEX_CLOSED_HEIGHT = 36
const INDEX_OPEN_FOOTER_HEIGHT = 48
const INDEX_EASE = [0.25, 0.1, 0.25, 1] as const

function renderText(content?: ReactNode) {
    if (content === null || content === undefined || content === false) {
        return null
    }

    if (typeof content === "string" || typeof content === "number") {
        return <p>{content}</p>
    }

    return content
}

function Media({
    media,
    decorative = false,
}: {
    media: ProjectMedia
    decorative?: boolean
}) {
    if (media.type === "image") {
        return <img src={media.src} alt={decorative ? "" : media.alt} />
    }

    return (
        <video
            src={media.src}
            aria-label={media.alt}
            poster={media.poster}
            autoPlay={media.autoPlay}
            loop={media.loop}
            muted={media.muted}
            controls={media.controls}
            playsInline={media.playsInline}
        />
    )
}

function ExpandedImage({
    media,
    onClose,
}: {
    media: Extract<ProjectMedia, { type: "image" }>
    onClose: () => void
}) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        const previousOverflow = document.body.style.overflow

        previousFocusRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null

        document.body.style.overflow = "hidden"

        const focusCloseButton = () => {
            closeButtonRef.current?.focus()
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                onClose()
                return
            }

            if (event.key !== "Tab") {
                return
            }

            const dialog = dialogRef.current

            if (!dialog) {
                return
            }

            const focusableElements = Array.from(
                dialog.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter(
                (element) =>
                    !element.hasAttribute("hidden") &&
                    element.getAttribute("aria-hidden") !== "true",
            )

            if (focusableElements.length === 0) {
                event.preventDefault()
                dialog.focus()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            const activeElement = document.activeElement

            if (
                event.shiftKey &&
                (activeElement === firstElement ||
                    !dialog.contains(activeElement))
            ) {
                event.preventDefault()
                lastElement.focus()
                return
            }

            if (
                !event.shiftKey &&
                (activeElement === lastElement ||
                    !dialog.contains(activeElement))
            ) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        const handleFocusIn = (event: FocusEvent) => {
            const dialog = dialogRef.current

            if (
                dialog &&
                event.target instanceof Node &&
                !dialog.contains(event.target)
            ) {
                focusCloseButton()
            }
        }

        requestAnimationFrame(focusCloseButton)

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("focusin", handleFocusIn)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("focusin", handleFocusIn)

            previousFocusRef.current?.focus()
        }
    }, [onClose])

    const transition = shouldReduceMotion
        ? {
              duration: 0,
          }
        : {
              type: "tween" as const,
              duration: 0.24,
              ease: INDEX_EASE,
          }

    return (
        <motion.div
            ref={dialogRef}
            className="project-media-expanded"
            role="dialog"
            aria-modal="true"
            aria-label={media.alt}
            tabIndex={-1}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                      }
            }
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={transition}
            onPointerDown={onClose}
        >
            <button
                ref={closeButtonRef}
                type="button"
                className="project-media-expanded-close"
                aria-label="Close image"
                onClick={onClose}
            >
                <X size={20} strokeWidth={2} />
            </button>

            <motion.img
                className="project-media-expanded-image"
                src={media.src}
                alt={media.alt}
                initial={
                    shouldReduceMotion
                        ? false
                        : {
                              opacity: 0,
                              scale: 0.98,
                          }
                }
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.98,
                }}
                transition={transition}
                onPointerDown={(event) => event.stopPropagation()}
            />
        </motion.div>
    )
}

function Section({
    section,
    onOpenImage,
}: {
    section: ProjectSection
    onOpenImage: (media: Extract<ProjectMedia, { type: "image" }>) => void
}) {
    if (section.type === "custom") {
        return (
            <section
                id={section.id}
                className="project-section project-section-custom"
            >
                {section.content}
            </section>
        )
    }

    if (section.type === "media") {
        const media = section.media
            ? Array.isArray(section.media)
                ? section.media
                : [section.media]
            : []

        return (
            <section
                id={section.id}
                className="project-section project-section-media"
            >
                {(section.title || section.description) && (
                    <div className="project-section-copy">
                        {section.title && <h2>{section.title}</h2>}
                        {section.description && renderText(section.description)}
                    </div>
                )}

                {media.length > 0 && (
                    <div
                        className={`project-media-grid ${
                            media.length > 1 ? "project-media-grid-multiple" : ""
                        }`}
                    >
                        {media.map((item, index) =>
                            item.type === "image" ? (
                                <button
                                    type="button"
                                    className="project-media-frame project-media-frame-button"
                                    key={index}
                                    aria-label={`Expand ${item.alt}`}
                                    onClick={() => onOpenImage(item)}
                                >
                                    <Media media={item} decorative />
                                </button>
                            ) : (
                                <div className="project-media-frame" key={index}>
                                    <Media media={item} />
                                </div>
                            ),
                        )}
                    </div>
                )}

                {section.caption && (
                    <div className="project-media-caption">
                        {renderText(section.caption)}
                    </div>
                )}

                {section.content && (
                    <div className="project-section-content">
                        {renderText(section.content)}
                    </div>
                )}
            </section>
        )
    }

    return (
        <section
            id={section.id}
            className="project-section project-section-regular"
        >
            {section.title && <h2>{section.title}</h2>}

            {section.description && (
                <div className="project-section-description">
                    {renderText(section.description)}
                </div>
            )}

            {section.content && (
                <div className="project-section-content">
                    {renderText(section.content)}
                </div>
            )}
        </section>
    )
}

type IndexSection = {
    id: string
    title: ReactNode
}

function getOpenWidth() {
    if (typeof window === "undefined") {
        return INDEX_OPEN_WIDTH
    }

    if (window.innerWidth < 500) {
        return window.innerWidth - 32
    }

    return INDEX_OPEN_WIDTH
}

function ProjectIndex({ sections }: { sections: IndexSection[] }) {
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
    const [listHeight, setListHeight] = useState(0)
    const [openWidth, setOpenWidth] = useState(getOpenWidth)

    const indexRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLElement>(null)
    const toggleRef = useRef<HTMLButtonElement>(null)
    const shouldReduceMotion = useReducedMotion()

    const transition = shouldReduceMotion
        ? {
              duration: 0,
          }
        : {
              type: "tween" as const,
              duration: 0.28,
              ease: INDEX_EASE,
          }

    const contentTransition = shouldReduceMotion
        ? {
              duration: 0,
          }
        : {
              type: "tween" as const,
              duration: 0.2,
              ease: INDEX_EASE,
          }

    const openHeight = listHeight + INDEX_OPEN_FOOTER_HEIGHT

    useLayoutEffect(() => {
        const list = listRef.current

        if (!list) {
            return
        }

        const measure = () => {
            setListHeight(list.scrollHeight)
        }

        measure()

        const observer = new ResizeObserver(measure)
        observer.observe(list)

        return () => {
            observer.disconnect()
        }
    }, [sections])

    useEffect(() => {
        const handleResize = () => {
            setOpenWidth(getOpenWidth())
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const update = () => {
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight

            const nextProgress =
                scrollable > 0
                    ? Math.round((window.scrollY / scrollable) * 100)
                    : 100

            setProgress(Math.max(0, Math.min(100, nextProgress)))

            const activationLine = window.innerHeight * 0.34
            let nextActive = sections[0]?.id ?? ""

            for (const section of sections) {
                const element = document.getElementById(section.id)

                if (!element) {
                    continue
                }

                if (element.getBoundingClientRect().top <= activationLine) {
                    nextActive = section.id
                }
            }

            setActiveId(nextActive)
        }

        update()

        window.addEventListener("scroll", update, { passive: true })
        window.addEventListener("resize", update)

        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [sections])

    useEffect(() => {
        if (!open) {
            return
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (!indexRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false)
                toggleRef.current?.focus()
            }
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [open])

    const goToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
        })

        setOpen(false)
        toggleRef.current?.focus()
    }

    if (sections.length === 0) {
        return null
    }

    return (
        <div ref={indexRef} className="project-index">
            <motion.div 
                className="project-index-panel"
                initial={false}
                animate={{
                    width: open ? openWidth : INDEX_CLOSED_WIDTH,
                    height: open ? openHeight : INDEX_CLOSED_HEIGHT,
                    borderRadius: 20,
                }}
                whileTap={
                    shouldReduceMotion
                        ? undefined
                        : {
                              scale: 0.9,
                          }
                }
                transition={{
                    ...transition,
                    scale: {
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                    },
                }}
            >
                <motion.nav
                    ref={listRef}
                    id="project-section-index"
                    className="project-index-list"
                    aria-label="Project sections"
                    aria-hidden={!open}
                    style={{
                        width: openWidth,
                    }}
                    initial={false}
                    animate={{
                        opacity: open ? 1 : 0,
                        filter: open ? "blur(0px)" : "blur(6px)",
                        y: open ? 0 : 8,
                    }}
                    transition={contentTransition}
                >
                    {sections.map((section, index) => (
                        <button
                            type="button"
                            tabIndex={open ? 0 : -1}
                            key={section.id}
                            className={`project-index-item ${
                                activeId === section.id
                                    ? "project-index-item-active"
                                    : ""
                            }`}
                            aria-current={
                                activeId === section.id ? "location" : undefined
                            }
                            onClick={() => goToSection(section.id)}
                        >
                            <span className="project-index-number">
                                {String(index + 1).padStart(2, "0")}.
                            </span>

                            <span className="project-index-title">
                                {section.title}
                            </span>
                        </button>
                    ))}
                </motion.nav>

                <motion.button
                    ref={toggleRef}
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className="project-index-footer"
                    aria-expanded={open}
                    aria-controls="project-section-index"
                    initial={false}
                    animate={{
                        padding: open
                            ? "12px 12px 12px 12px"
                            : "0px 6px 0px 10px",
                        height: open ? "48px" : "36px",
                    }}
                    transition={transition}
                >
                    <span className="project-index-toggle">
                        <span className="project-index-chevron">
                            <ChevronsUpDown size={16} strokeWidth={2} />
                        </span>

                        <span>Index</span>
                    </span>

                    <span className="project-index-progress">
                        {progress}%
                    </span>
                </motion.button>
            </motion.div>
        </div>
    )
}

function Project() {
    const { projectName } = useParams<{ projectName: string }>()
    const project = projectName ? projects[projectName] : undefined
    const [expandedImage, setExpandedImage] = useState<
        Extract<ProjectMedia, { type: "image" }> | null
    >(null)

    const indexedSections = useMemo<IndexSection[]>(() => {
        if (!project) {
            return []
        }

        return project.sections.flatMap((section) => {
            if (
                section.type === "custom" ||
                !section.id ||
                !section.title
            ) {
                return []
            }

            return [
                {
                    id: section.id,
                    title: section.title,
                },
            ]
        })
    }, [project])

    if (!project) {
        return null
    }

    return (
        <main className="project-page">
            <div className="project-inner">
                <header className="project-header">
                    <RouteveilLink
                        to={-1}
                        transition={{
                            exit: "fade",
                        }}
                        type="button"
                        className="project-back"
                        aria-label="Back"
                    >
                        <ArrowLeft size={18} strokeWidth={2} />
                    </RouteveilLink>

                    <div className="project-title-block">
                        <h1>{project.title}</h1>

                        {project.description && (
                            <div className="project-description">
                                {renderText(project.description)}
                            </div>
                        )}
                    </div>
                </header>

                <article className="project-sections">
                    {project.sections.map((section, index) => (
                        <Section
                            key={section.id ?? `${section.type}-${index}`}
                            section={section}
                            onOpenImage={setExpandedImage}
                        />
                    ))}
                </article>
            </div>

            <Footer />

            <ProjectIndex sections={indexedSections} />

            <AnimatePresence>
                {expandedImage && (
                    <ExpandedImage
                        key={expandedImage.src}
                        media={expandedImage}
                        onClose={() => setExpandedImage(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    )
}

export default Project

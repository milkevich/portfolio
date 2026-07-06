/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react"
import LocomotiveScroll from "locomotive-scroll"
import "locomotive-scroll/dist/locomotive-scroll.css"

import { Header } from "./sections/Header"
import { ProjectsList } from "./sections/ProjectsList"
import Intro from "./sections/Intro"
import { outerContainerCss } from "./styles/headerStyles"
import ClickSpark from "./shared/UI/ClickSpark"

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [animateIn, setAnimateIn] = useState(false)
  const [transitionDone, setTransitionDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)

      requestAnimationFrame(() => {
        setAnimateIn(true)
      })
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showIntro || !scrollRef.current) return

    const scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.08,
      },
    })

      ; (window as any).locoScroll = scroll

    setTimeout(() => {
      scroll.resize()
    }, 500)

    return () => {
      scroll.destroy()
    }
  }, [showIntro])

  if (showIntro) {
    return <Intro />
  }

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      css={outerContainerCss}
      style={transitionDone ? undefined : {
        transform: animateIn ? "translateY(0)" : "translateY(15%)",
        opacity: animateIn ? 1 : 0,
        transition:
          "transform 800ms ease, opacity 800ms ease",
      }}
      onTransitionEnd={(e) => {
        if (animateIn && e.propertyName === "opacity" && e.target === e.currentTarget) setTransitionDone(true)
      }}
    >
      <ClickSpark
        sparkColor="#000000"
        sparkSize={5}
        sparkRadius={35}
        sparkCount={10}
        duration={500}
      >
        <Header />
        <ProjectsList />
      </ClickSpark>
    </div>
  )
}

export default App
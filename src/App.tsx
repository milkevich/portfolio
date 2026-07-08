/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react"
import { keyframes } from "@emotion/react"
import LocomotiveScroll from "locomotive-scroll"
import "locomotive-scroll/dist/locomotive-scroll.css"

import { Header } from "./sections/Header"
import { ProjectsList } from "./sections/ProjectsList"
import Intro from "./sections/Intro"
import { outerContainerCss } from "./styles/headerStyles"
import ClickSpark from "./shared/UI/ClickSpark"

const appReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 15%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showIntro || !scrollRef.current) return

    let scroll: LocomotiveScroll | undefined
    const timer = setTimeout(() => {
      scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
        },
      })

      ; (window as any).locoScroll = scroll

      scroll.resize()
    }, 850)

    return () => {
      clearTimeout(timer)
      scroll?.destroy()
    }
  }, [showIntro])

  if (showIntro) {
    return <Intro />
  }

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      css={[outerContainerCss, {
        animation: `${appReveal} 800ms ease both`,
        willChange: "transform, opacity",
      }]}
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

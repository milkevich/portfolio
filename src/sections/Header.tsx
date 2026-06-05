/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import hero from '../assets/hero-bw-adj.png'
import heroClosed from '../assets/hero-bw-closed-adj.png'
import { Tooltip, TooltipContent, TooltipTrigger } from '../shared/UI/Tooltip'
import CV from '../assets/CV_Gleb_Milkevich.pdf'

import {
  containerCss,
  descriptionCss,
  greyTextCss,
  linksContainerCss,
  baseLinkCss,
  linkCss,
  socialLinksCss,
  heroImageCss,
  headerContainerCss,
} from '../styles/headerStyles'
import Typewriter from '../shared/UI/Typewriter'

const socials = [
  { href: 'https://linkedin.com/in/milkevich', text: 'LinkedIn', firstChar: 'L' },
  { href: 'https://github.com/milkevich', text: 'GitHub', firstChar: 'G' },
  { href: 'https://instagram.com/milkeviich', text: 'Instagram', firstChar: 'I' },
]

export const Header = () => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen((prev) => !prev)
    }, open ? Math.random() * 1500 + 1000 : Math.random() * 350 + 100)

    return () => clearTimeout(timeout)
  }, [open])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (!target) return

    const locoScroll = (window as any).locoScroll
    if (locoScroll) {
      locoScroll.scrollTo(target, { offset: 0, duration: 1.5, easing: [0.22, 1, 0.36, 1] })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div css={headerContainerCss}>
      <div css={containerCss}>
        <div css={linksContainerCss}>
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <a css={linkCss} href={CV} download="CV_Gleb_Milkevich.pdf">
                <Typewriter speed={150} text="DOWNLOAD" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Download in .pdf</TooltipContent>
          </Tooltip>

          <a css={linkCss} href="#work" onClick={(e) => handleSmoothScroll(e, 'work')}>
            <Typewriter shuffleSpeed={100} speed={50} text="WORK" />
          </a>

          <a css={linkCss} href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
            <Typewriter speed={150} text="CONTACT" />
          </a>
        </div>

        <div css={descriptionCss}>
          <span css={greyTextCss}>
            H<Typewriter isHoverable={false} speed={100} text="i, I am" />
          </span>
          <span>
            G<Typewriter isHoverable={false} speed={20} text="leb, a frontend engineer focused on React, TypeScript, design systems, and polished product experiences. Creator of" />
            <Tooltip placement="bottom">
              <TooltipTrigger>
                <a css={linkCss} href="https://plainframe-ui.com" target="_blank" rel="noopener noreferrer">
                  <Typewriter delay={2000} speed={30} text="Plainframe UI" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Go to Plainframe UI</TooltipContent>
            </Tooltip>
            .
          </span>
        </div>

        <div css={descriptionCss}>
          <span css={greyTextCss}>
            S<Typewriter isHoverable={false} speed={200} text="ocials" />
          </span>
          <div css={socialLinksCss}>
            {socials.map(({ href, text, firstChar }) => (
              <Tooltip key={href} placement="bottom">
                <TooltipTrigger>
                  <a href={href} css={baseLinkCss} target="_blank" rel="noopener noreferrer">
                    {firstChar}<Typewriter isHoverable text={text.slice(1)} speed={150} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Visit {text}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <div css={linksContainerCss}>
          <Tooltip placement="top">
            <TooltipTrigger>
              <a css={linkCss} href="mailto:glebmilkevich@icloud.com">
                <Typewriter isHoverable speed={100} text="glebmilkevich@icloud.com" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Email me</TooltipContent>
          </Tooltip>

          <span css={[greyTextCss, { '@media (max-width: 500px)': { display: 'none' } }]}>
            <Typewriter isHoverable={false} speed={100} text="Philadelphia, PA" />
          </span>
        </div>
      </div>

      <img
        css={heroImageCss}
        src={open ? hero : heroClosed}
        alt="Gleb Milkevich Hero Image"
      />
    </div>
  )
}

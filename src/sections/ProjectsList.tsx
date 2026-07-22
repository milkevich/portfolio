/** @jsxImportSource @emotion/react */
import pfui from "../assets/mockups/pfui.png"
import socialMedia from "../assets/mockups/socialmedia.png"
import mindMerge from "../assets/mockups/mindmerge.png"
import eventPlanner from "../assets/mockups/eventplanner.png"
import routeveil from "../assets/mockups/routeveil.png"
import { Tooltip, TooltipContent, TooltipTrigger } from "../shared/UI/Tooltip"

import {
    blackSectionCss,
    whiteProjectsSectionCss,
    projectGridCss,
    projectLeftCss,
    projectRightCss,
    projectLeftReverseCss,
    projectHeaderCss,
    projectImageCss,
    projectDescriptionCss,
    projectMetaCss,
    projectMetaLabelCss,
    baseLinkCss,
    greyTextCss,
} from "../styles/headerStyles"
import Typewriter from "../shared/UI/Typewriter"

const sectionLabelCss = {
    display: "block",
    fontSize: 16,
    lineHeight: 0.9,
    whiteSpace: "nowrap" as const,
    textTransform: "uppercase" as const,
    padding: "1rem",
}

const desktopProjectsCss = {
    display: "block",
    "@media (max-width: 850px)": { display: "none" },
}

const mobileProjectsCss = {
    display: "none",
    "@media (max-width: 850px)": { display: "block" },
}

const mobileProjectCss = { borderBottom: "1px solid #E5E5E5" }

const mobileImageCss = { width: "100%", height: "auto", display: "block" }

const mobileProjectInfoCss = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    padding: "1rem",
    gap: "3rem",
    borderTop: "1px solid #E5E5E5",
    minHeight: 290,
}

const experience = [
    {
        company: "FlickHunt",
        period: "JUN 2025 - PRESENT",
        description: "FlickHunt is a movie discovery platform that helps users explore, search, and save films through a clean and intuitive interface.",
    },
    {
        company: "Chyper Motion",
        period: "FEB 2024 - MAR 2025",
        description: "Chyper Motion is an AI-powered sports analytics platform that helps athletes improve their performance through motion analysis and personalized feedback.",
    },
]

const projects = [
    {
        number: "01/05",
        title: "Plainframe UI",
        image: pfui,
        link: "https://plainframe-ui.com",
        linkLabel: "DEMO",
        tooltip: "Visit Plainframe UI",
        description: "Plainframe UI is a React component library designed to help developers build beautiful, accessible, and responsive user interfaces faster and more efficiently.",
        date: "JAN 2026",
    },
    {
        number: "02/05",
        title: "Routeveil",
        image: routeveil,
        link: "https://routeveil.dev",
        linkLabel: "DEMO",
        tooltip: "Visit RouteVeil",
        description: "Routeveil is a React transition library designed to help developers produce smooth, customizable, and responsive route transitions faster and more efficiently.",
        date: "JUL 2026",
    },
        {
        number: "03/05",
        title: "Social Media Platform",
        image: socialMedia,
        link: "https://github.com/milkevich/expo-pract",
        linkLabel: "REPO",
        tooltip: "Visit Social Media Platform",
        description: "A social media platform built with React Native. Users can communicate through text, media, and voice messages, create and share content, follow other users, and engage through likes and comments.",
        date: "JUL 2024",
    },
    {
        number: "04/05",
        title: "Mind Merge",
        image: mindMerge,
        link: "https://milkevich.github.io/mind-merge",
        linkLabel: "DEMO",
        tooltip: "Visit Mind Merge",
        description: "Mind Merge is a social media platform built with React, Vite, and Firebase that allows users to create, share, and engage with content through posts, comments, and likes.",
        date: "MAR 2024",
    },
    {
        number: "05/05",
        title: "Event Planner",
        image: eventPlanner,
        link: "https://milkevich.github.io/event-planner",
        linkLabel: "DEMO",
        tooltip: "Visit Event Planner",
        description: "An event planning and productivity application built with React, SCSS, and Firebase. Users can organize tasks, manage events, and track daily activities using customizable color-coded categories and flexible sorting options.",
        date: "FEB 2024",
    },
]

const contactLinks = [
    { label: "Email", href: "mailto:glebmilkevich@icloud.com", display: "glebmilkevich@icloud.com", firstChar: "g" },
    { label: "Phone", href: "tel:+14454485170", display: "1 (445) 448-5170", firstChar: "+" },
]

const contactSocials = [
    { href: "https://linkedin.com/in/milkevich", text: "LinkedIn", firstChar: "L" },
    { href: "https://github.com/milkevich", text: "GitHub", firstChar: "G" },
    { href: "https://instagram.com/milkeviich", text: "Instagram", firstChar: "I" },
]

const ProjectCardHeader = ({ title, number, link, linkLabel, tooltip }: {
    title: string; number: string; link: string; linkLabel: string; tooltip: string
}) => (
    <div css={projectHeaderCss}>
        <span style={{ textTransform: "uppercase" }}>
            <Typewriter isHoverable={false} speed={150} text={title} />{" "}
            <span css={greyTextCss}>{number}</span>
        </span>
        <Tooltip placement="bottom">
            <TooltipTrigger>
                <a href={link} target="_blank" rel="noopener noreferrer" css={baseLinkCss}>
                    <Typewriter isHoverable speed={150} text={linkLabel} />
                </a>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    </div>
)

const ProjectCardMeta = ({ date }: { date: string }) => (
    <div css={projectMetaCss}>
        <div>
            <div css={projectMetaLabelCss}>R<Typewriter isHoverable={false} speed={150} text="OLE" /></div>
            <div>D<Typewriter isHoverable={false} speed={150} text="EVELOPER" /></div>
        </div>
        <div>
            <div css={projectMetaLabelCss}>D<Typewriter isHoverable={false} speed={150} text="ATE" /></div>
            <div><Typewriter isHoverable={false} speed={150} text={date} /></div>
        </div>
    </div>
)

export const ProjectsList = () => {
    return (
        <>
            <div css={blackSectionCss}>
                <div style={{ margin: "0 auto", maxWidth: 1520, width: "100%" }}>
                    <span css={sectionLabelCss}>
                        E<Typewriter isHoverable={false} speed={150} text="xperience" />
                    </span>
                    {experience.map(({ company, period, description }) => (
                        <div key={company} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 600, padding: "1rem" }}>
                            <span style={{ textTransform: "uppercase" }}>{company} <span>{period}</span></span>
                            <span>F<Typewriter isHoverable={false} speed={150} text="rontend Developer" /></span>
                            <span css={greyTextCss}>
                                <Typewriter isHoverable={false} speed={25} text={description} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div id="work" css={whiteProjectsSectionCss}>
                <span css={sectionLabelCss}>
                    P<Typewriter isHoverable={false} speed={150} text="rojects" />
                </span>
                <div css={{ margin: 0, backgroundColor: "#e5e5e5", height: 1, width: "100%" }} />

                <div css={desktopProjectsCss}>
                    {projects.map((project, index) => {
                        const isReverse = index % 2 === 1
                        return (
                            <div css={projectGridCss} key={project.title}>
                                {isReverse && (
                                    <div css={projectRightCss}>
                                        <img src={project.image} alt={`${project.title} Project Image`} css={projectImageCss} />
                                    </div>
                                )}
                                <div css={isReverse ? projectLeftReverseCss : projectLeftCss}>
                                    <div>
                                        <ProjectCardHeader {...project} />
                                        <p css={projectDescriptionCss}>
                                            <Typewriter isHoverable={false} speed={15} text={project.description} />
                                        </p>
                                    </div>
                                    <ProjectCardMeta date={project.date} />
                                </div>
                                {!isReverse && (
                                    <div css={projectRightCss}>
                                        <img src={project.image} alt={`${project.title} Project Image`} css={projectImageCss} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div css={mobileProjectsCss}>
                    {projects.map((project) => (
                        <div css={mobileProjectCss} key={project.title}>
                            <img src={project.image} alt={`${project.title} Project Image`} css={mobileImageCss} />
                            <div css={mobileProjectInfoCss}>
                                <div>
                                    <ProjectCardHeader {...project} />
                                    <p css={projectDescriptionCss}>
                                        <Typewriter isHoverable={false} speed={15} text={project.description} />
                                    </p>
                                </div>
                                <ProjectCardMeta date={project.date} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="contact" style={{ backgroundColor: "black", color: "white", zIndex: 10, position: "relative", minHeight: 425 }}>
                <div style={{ margin: "0 auto", maxWidth: 1520, width: "100%" }}>
                    <span css={sectionLabelCss}>
                        C<Typewriter isHoverable={false} speed={150} text="ontact Me" />
                    </span>
                    <div css={greyTextCss} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 600, padding: "1rem" }}>
                        <span>I<Typewriter isHoverable={false} speed={25} text="f you're interested in working together, have any questions, or just want to say hi." /></span>
                        <span>F<Typewriter isHoverable={false} speed={25} text="eel free to reach out." /></span>
                    </div>
                    <div css={{ display: "flex", gap: "1rem", paddingTop: "100px", "@media (max-width: 490px)": { flexDirection: "column", gap: 0 } }}>
                        {contactLinks.map(({ label, href, display, firstChar }) => (
                            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 600, padding: "1rem" }}>
                                <span css={greyTextCss} style={{ textTransform: "uppercase" }}>
                                    {label[0]}<Typewriter isHoverable={false} speed={100} text={label.slice(1)} />
                                </span>
                                <a style={{ color: "white", textTransform: "uppercase" }} css={baseLinkCss} href={href}>
                                    {firstChar}<Typewriter isHoverable speed={100} text={display.slice(1)} />
                                </a>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 600, padding: "1rem" }}>
                        <span css={greyTextCss} style={{ textTransform: "uppercase" }}>
                            E<Typewriter isHoverable={false} speed={150} text="xternal" />
                        </span>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            {contactSocials.map(({ href, text, firstChar }) => (
                                <a key={href} style={{ color: "white", textTransform: "uppercase" }} css={baseLinkCss} href={href} target="_blank" rel="noopener noreferrer">
                                    {firstChar}<Typewriter isHoverable speed={150} text={text.slice(1)} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

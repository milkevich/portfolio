import type { ReactNode } from "react"
import routeveilOverview from "../../assets/projects-assets/routeveil-overview.png"
import routeveilDocs from "../../assets/projects-assets/routeveil-docs.png"
import routeveilShared from "../../assets/projects-assets/routeveil-shared-elements.png"
import routeveilLogo from "../../assets/projects-assets/routeveil-logo.svg"
import pfuiOverview from "../../assets/projects-assets/pfui-overview.png"
import pfuiMode from "../../assets/projects-assets/pfui-mode.png"
import pfuiPlayground from "../../assets/projects-assets/pfui-playground.png"
import pfuiLogo from "../../assets/projects-assets/pfui-logo.png"
export type ProjectMedia =
    | {
        type: "image"
        src: string
        alt: string
    }
    | {
        type: "video"
        src: string
        alt: string
        poster?: string
        autoPlay?: boolean
        loop?: boolean
        muted?: boolean
        controls?: boolean
        playsInline?: boolean
    }

export type ProjectSection =
    | {
        type: "section"
        id: string
        title?: ReactNode
        description?: ReactNode
        content?: ReactNode
    }
    | {
        type: "media"
        id?: string
        title?: ReactNode
        description?: ReactNode
        media?: ProjectMedia | ProjectMedia[]
        caption?: ReactNode
        content?: ReactNode
    }
    | {
        type: "custom"
        id?: string
        content: ReactNode
    }

export type Project = {
    title: ReactNode
    description?: ReactNode
    sections: ProjectSection[]
}

const projects: Record<string, Project> = {
    routeveil: {
        title: "React Router transitions engine",
        description: (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <img style={{ width: "1rem", height: "1rem", borderRadius: 5, marginTop: 2 }} src={routeveilLogo} alt="" />
                <a href="https://routeveil.dev">routeveil.dev</a>
            </div>
        ),
        sections: [
            {
                type: "media",
                media: {
                    type: "image",
                    src: routeveilOverview,
                    alt: "Routeveil homepage",
                },
                caption: "Routeveil overview",
            },

            {
                type: "section",
                id: "context",
                title: "Context",
                description: (
                    <>
                        <p>
                            I kept running into the same problem when building
                            routed React interfaces: the transition belonged to
                            the navigation, but the animation logic usually ended
                            up scattered across the pages being navigated between.
                        </p>

                        <p>
                            That works for a simple fade. It becomes much harder to
                            reason about once different links need different motion,
                            part of the interface should stay persistent, or a
                            transition has to coordinate two route states at once.
                        </p>

                        <p>
                            Routeveil started with one idea: choose the movement
                            where navigation begins, and let route components stay
                            ordinary React components. The{" "}
                            <a href="https://routeveil.dev/docs">documentation</a>
                            {" "}follows that same separation.
                        </p>
                    </>
                ),
            },

            {
                type: "section",
                id: "problem",
                title: "Problem",
                description: (
                    <>
                        <p>
                            React Router owns when the route changes, while an
                            animation needs control over what happens immediately
                            before and after that change. Without a layer between
                            the two, those responsibilities quickly get mixed
                            together.
                        </p>

                        <p>
                            The outgoing view needs time to leave before navigation
                            commits. The incoming view needs a predictable way to
                            appear afterward. Full-screen transitions may need to
                            cover interface outside the routed page, while normal
                            page transitions should leave that interface alone.
                        </p>

                        <p>
                            I wanted those differences to be explicit without
                            requiring a new animation setup inside every screen.
                        </p>
                    </>
                ),
            },

            {
                type: "section",
                id: "approach",
                title: "Approach",
                description: (
                    <>
                        <p>
                            I designed Routeveil around a small transition lifecycle:
                            <strong> exit, navigate, enter, reset.</strong>
                        </p>

                        <p>
                            A provider coordinates navigation, while a view marks
                            the routed region that is allowed to transition. The
                            transition itself is attached to the link or navigation
                            call that starts the interaction.
                        </p>

                        <p>
                            That separation became the main design constraint for
                            the API. React Router continues to handle routing;
                            Routeveil handles the visual handoff around it. The
                            person using the library describes the movement, while
                            the runtime owns the timing and cleanup required to make
                            it happen.
                        </p>
                    </>
                ),
            },

            {
                type: "media",
                media: {
                    type: "image",
                    src: routeveilDocs,
                    alt: "Routeveil documentation showing the overview, quick start and transition lifecycle",
                },
                caption: "Routeveil docs",
            },

            {
                type: "section",
                id: "solution",
                title: "Solution",
                description: (
                    <>
                        <p>
                            The same navigation model now supports several kinds of
                            movement without changing how routes are structured.
                            Page transitions animate only the routed view. Overlay
                            transitions can cover the entire viewport when the
                            interaction needs a more graphic handoff.
                        </p>

                        <p>
                            <a href="https://routeveil.dev/lab/shared-elements">
                                Shared elements
                            </a>{" "}
                            pushed the system further. Instead of treating the
                            outgoing and incoming pages as unrelated screens,
                            Routeveil can match a named element across both routes
                            and keep it visually continuous while navigation happens
                            around it.
                        </p>

                        <p>
                            I built the{" "}
                            <a href="https://routeveil.dev/lab/shared-elements">
                                Lab
                            </a>{" "}
                            alongside the library so these behaviors could be
                            explored visually instead of understood only through
                            API documentation. It became a place to test the
                            interaction model itself as the runtime evolved.
                        </p>
                    </>
                ),
            },

            {
                type: "media",
                media: {
                    type: "image",
                    src: routeveilShared,
                    alt: "Routeveil shared-elements playground",
                },
                caption: "Shared elements",
            },

            {
                type: "section",
                id: "impact",
                title: "Impact",
                description: (
                    <>
                        <p>
                            Routeveil grew from a transition utility into a small
                            developer product: the runtime, public API,
                            documentation, interactive Lab and the visual language
                            around all of them were designed together.
                        </p>

                        <p>
                            It also became one of the clearest examples of how I like
                            to work. The interaction design could not be separated
                            from the engineering underneath it — routing behavior,
                            lifecycle decisions and API design all directly changed
                            how the final motion felt.
                        </p>
                    </>
                ),
            },
        ],
    },

    "plainframe-ui": {
        title: "UI Component Library for React",
        description: (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <img style={{ width: "1rem", height: "1rem", borderRadius: 5, marginTop: 2 }} src={pfuiLogo} alt="" />
                <a href="https://plainframe-ui.com">plainframe-ui.com</a>
            </div>
        ),
        sections: [
            {
                type: "media",
                media: {
                    type: "image",
                    src: pfuiOverview,
                    alt: "Plainframe UI homepage showing interface components in light mode",
                },
                caption: "Plainframe overview",
            },

            {
                type: "section",
                id: "context",
                title: "Context",
                description: (
                    <>
                        <p>
                            I built Plainframe UI after repeatedly using component
                            libraries that solved the implementation work but also
                            brought a very specific visual language with them.
                        </p>

                        <p>
                            That tradeoff made sense for speed, but it often meant
                            spending the next part of the project undoing defaults:
                            changing spacing, color, radius, typography and
                            component styling until the interface stopped looking
                            like the library it came from.
                        </p>

                        <p>
                            I wanted a system that could still make building React
                            interfaces faster, while leaving enough room for the
                            product itself to have a distinct visual identity.
                        </p>
                    </>
                ),
            },

            {
                type: "section",
                id: "problem",
                title: "Problem",
                description: (
                    <>
                        <p>
                            The challenge was finding the line between useful
                            defaults and too much opinion.
                        </p>

                        <p>
                            Components still need a consistent structure, sensible
                            interaction states and predictable behavior. But if
                            every decision is baked into the component, changing the
                            visual system becomes a fight against the library
                            instead of normal product work.
                        </p>

                        <p>
                            The system also had to remain coherent across different
                            surfaces and themes. A component should not feel like a
                            separate design just because the interface switches
                            from light to dark mode.
                        </p>
                    </>
                ),
            },

            {
                type: "section",
                id: "approach",
                title: "Approach",
                description: (
                    <>
                        <p>
                            I treated Plainframe as a set of reusable interface
                            primitives rather than finished product UI. The{" "}
                            <a href="https://plainframe-ui.com/docs">
                                documentation
                            </a>{" "}
                            keeps those primitives focused and composable.
                        </p>

                        <p>
                            The components share the same spacing, hierarchy and
                            interaction logic, while visual decisions such as color,
                            radius and density are kept flexible enough to change
                            with the product around them.
                        </p>

                        <p>
                            Light and dark modes were designed together instead of
                            treating dark mode as an inverted version added later.
                            The same controls, information hierarchy and component
                            relationships stay intact while the visual treatment
                            changes around them.
                        </p>
                    </>
                ),
            },

            {
                type: "media",
                media: {
                    type: "image",
                    src: pfuiMode,
                    alt: "Plainframe UI interface shown across light and dark modes",
                },
                caption: "Theme system",
            },

            {
                type: "section",
                id: "solution",
                title: "Solution",
                description: (
                    <>
                        <p>
                            Plainframe became a component system where the defaults
                            are useful enough to build with immediately, but not so
                            specific that they define the product for you.
                        </p>

                        <p>
                            I built the{" "}
                            <a href="https://plainframe-ui.com/playground">
                                Playground
                            </a>{" "}
                            to make that flexibility visible. Instead of reading
                            through configuration options and imagining the result,
                            you can change layout, layering, radius, spacing, colors
                            and typography while looking at a working interface
                            built from the actual components.
                        </p>

                        <p>
                            That also made the Playground useful as a design tool.
                            The system can be explored visually first, then the same
                            decisions can carry into the application instead of
                            customization being treated as a separate engineering
                            step.
                        </p>
                    </>
                ),
            },

            {
                type: "media",
                media: {
                    type: "image",
                    src: pfuiPlayground,
                    alt: "Plainframe UI Playground with controls for layout, radius, spacing, colors and typography",
                },
                caption: "Theme Playground",
            },

            {
                type: "section",
                id: "impact",
                title: "Impact",
                description: (
                    <>
                        <p>
                            Plainframe UI became a place to work through component
                            design, API decisions and visual systems as one problem.
                            Building the library meant thinking about how a component
                            should look by default, how much of that appearance
                            should be replaceable, and which behaviors should remain
                            consistent regardless of styling.
                        </p>

                        <p>
                            It also pushed me toward a more systems-oriented way of
                            designing interfaces. Instead of solving one screen at a
                            time, I had to make decisions that could remain useful
                            across many combinations of components, themes and
                            product styles without forcing them all to look the same.
                        </p>
                    </>
                ),
            },
        ],
    },
}

export default projects

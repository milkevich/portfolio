import type {
    CSSProperties,
    PointerEvent as ReactPointerEvent,
} from "react"
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { RouteveilLink } from "routeveil/react-router"

import {
    gallery,
    type GalleryItem,
} from "./gallery"
import "./Gallery.css"

const DESKTOP_INITIAL_ZOOM = 0.75
const MOBILE_INITIAL_ZOOM = 0.4

const DESKTOP_MIN_ZOOM = 0.5
const MOBILE_MIN_ZOOM = 0.35
const MAX_ZOOM = 1
const ZOOM_STEP = 0.1

const EDGE_PADDING = 50

const DRAG_THRESHOLD = 0

const SCROLL_LERP = 0.15
const WHEEL_MULTIPLIER = 0.85
const DRAG_MULTIPLIER = 1

const INERTIA_FRICTION = 0.96
const INERTIA_MIN_SPEED = 0.01
const RELEASE_MULTIPLIER = 0.65
const MAX_RELEASE_SPEED = 2

const MOBILE_ITEM_MAX_WIDTH = 0.72
const MOBILE_ITEM_MAX_HEIGHT = 0.62

const MOTION_EASE = [0.22, 1, 0.36, 1] as const

type PointerPosition = {
    x: number
    y: number
}

type PanState = {
    pointerId: number

    startX: number
    startY: number

    lastX: number
    lastY: number
    lastTime: number

    targetX: number
    targetY: number

    velocityX: number
    velocityY: number
}

type PinchState = {
    distance: number
    zoom: number

    logicalX: number
    logicalY: number
}

type ScrollPhysics = {
    targetX: number
    targetY: number

    velocityX: number
    velocityY: number

    inertia: boolean
}

type ViewportSize = {
    width: number
    height: number
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

function getDistance(a: PointerPosition, b: PointerPosition) {
    return Math.hypot(
        b.x - a.x,
        b.y - a.y,
    )
}

function getMidpoint(a: PointerPosition, b: PointerPosition) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    }
}

function getInitialZoom() {
    if (typeof window === "undefined") {
        return DESKTOP_INITIAL_ZOOM
    }

    return window.innerWidth < 500
        ? MOBILE_INITIAL_ZOOM
        : DESKTOP_INITIAL_ZOOM
}

function getMinimumZoom() {
    if (typeof window === "undefined") {
        return DESKTOP_MIN_ZOOM
    }

    return window.innerWidth < 500
        ? MOBILE_MIN_ZOOM
        : DESKTOP_MIN_ZOOM
}

function getResponsiveItemSize(
    item: GalleryItem,
    viewport: ViewportSize,
) {
    if (
        viewport.width === 0 ||
        viewport.width >= 700
    ) {
        return {
            width: item.width,
            height: item.height,
        }
    }

    const maxLogicalWidth =
        (
            viewport.width *
            MOBILE_ITEM_MAX_WIDTH
        ) /
        MOBILE_INITIAL_ZOOM

    const maxLogicalHeight =
        (
            viewport.height *
            MOBILE_ITEM_MAX_HEIGHT
        ) /
        MOBILE_INITIAL_ZOOM

    const scale = Math.min(
        1,
        maxLogicalWidth / item.width,
        maxLogicalHeight / item.height,
    )

    return {
        width: item.width * scale,
        height: item.height * scale,
    }
}

function GalleryMedia({
    item,
    decorative = false,
}: {
    item: GalleryItem
    decorative?: boolean
}) {
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)

    const className = [
        "gallery-media",
        loaded && !failed
            ? "gallery-media-loaded"
            : "",
    ]
        .filter(Boolean)
        .join(" ")

    if (failed) {
        return null
    }

    return (
        <img
            className={className}
            src={item.src}
            alt={decorative ? "" : item.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
        />
    )
}

function GalleryModal({
    item,
    onClose,
}: {
    item: GalleryItem
    onClose: () => void
}) {
    const shouldReduceMotion = useReducedMotion()
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)
    const titleId = `gallery-modal-title-${item.id}`

    useEffect(() => {
        previousFocusRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null

        const focusCloseButton = () => {
            closeButtonRef.current?.focus()
        }

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                event.preventDefault()
                onClose()
                return
            }

            if (event.key === "Tab") {
                event.preventDefault()
                focusCloseButton()
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

        const focusFrame = requestAnimationFrame(focusCloseButton)

        document.addEventListener(
            "keydown",
            handleKeyDown,
        )
        document.addEventListener(
            "focusin",
            handleFocusIn,
        )

        return () => {
            cancelAnimationFrame(focusFrame)
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            )
            document.removeEventListener(
                "focusin",
                handleFocusIn,
            )

            previousFocusRef.current?.focus()
        }
    }, [onClose])

    const transition = shouldReduceMotion
        ? {
              duration: 0,
          }
        : {
              duration: 0.32,
              ease: MOTION_EASE,
          }

    return (
        <motion.div
            ref={dialogRef}
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={item.title ? titleId : undefined}
            aria-label={item.title ? undefined : item.alt}
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
                className="gallery-modal-close"
                onClick={onClose}
            >
                Close
            </button>

            <motion.div
                className="gallery-modal-content"
                initial={
                    shouldReduceMotion
                        ? false
                        : {
                              opacity: 0,
                              filter: "blur(8px)",
                              scale: 0.96,
                              y: 12,
                          }
                }
                animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    filter: "blur(8px)",
                    scale: 0.96,
                    y: 12,
                }}
                transition={transition}
                onPointerDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div
                    className="gallery-modal-media-shell"
                    style={{
                        aspectRatio:
                            `${item.width} / ${item.height}`,
                    }}
                >
                    <GalleryMedia item={item} />
                </div>

                {item.title && (
                    <p id={titleId} className="gallery-modal-title">
                        {item.title}
                    </p>
                )}
            </motion.div>
        </motion.div>
    )
}

function GalleryPage() {
    const viewportRef =
        useRef<HTMLDivElement>(null)

    const spaceRef =
        useRef<HTMLDivElement>(null)

    const canvasRef =
        useRef<HTMLDivElement>(null)

    const positionedRef = useRef(false)

    const pointersRef = useRef(
        new Map<number, PointerPosition>(),
    )

    const panRef =
        useRef<PanState | null>(null)

    const pinchRef =
        useRef<PinchState | null>(null)

    const draggedRef = useRef(false)

    const physicsFrameRef =
        useRef<number | null>(null)

    const physicsRef = useRef<ScrollPhysics>({
        targetX: 0,
        targetY: 0,
        velocityX: 0,
        velocityY: 0,
        inertia: false,
    })

    const [dragging, setDragging] =
        useState(false)

    const [zoom, setZoom] =
        useState(getInitialZoom)

    const zoomRef = useRef(zoom)

    const [
        viewportSize,
        setViewportSize,
    ] = useState<ViewportSize>({
        width: 0,
        height: 0,
    })

    const [
        selectedItem,
        setSelectedItem,
    ] = useState<GalleryItem | null>(null)

    const getMinZoom = useCallback(
        () => getMinimumZoom(),
        [],
    )

    const applyZoomStyles = useCallback(
        (nextZoom: number) => {
            const viewport =
                viewportRef.current

            const space =
                spaceRef.current

            const canvas =
                canvasRef.current

            if (
                !viewport ||
                !space ||
                !canvas
            ) {
                return
            }

            space.style.width =
                `${
                    gallery.width *
                        nextZoom +
                    EDGE_PADDING * 2
                }px`

            space.style.height =
                `${
                    gallery.height *
                        nextZoom +
                    EDGE_PADDING * 2
                }px`

            canvas.style.left =
                `${EDGE_PADDING}px`

            canvas.style.top =
                `${EDGE_PADDING}px`

            canvas.style.width =
                `${gallery.width}px`

            canvas.style.height =
                `${gallery.height}px`

            canvas.style.transform =
                `scale(${nextZoom})`
        },
        [],
    )

    const getScrollBounds = useCallback(() => {
        const viewport =
            viewportRef.current

        if (!viewport) {
            return {
                maxX: 0,
                maxY: 0,
            }
        }

        return {
            maxX: Math.max(
                0,
                gallery.width *
                    zoomRef.current +
                    EDGE_PADDING * 2 -
                    viewport.clientWidth,
            ),

            maxY: Math.max(
                0,
                gallery.height *
                    zoomRef.current +
                    EDGE_PADDING * 2 -
                    viewport.clientHeight,
            ),
        }
    }, [])

    const syncPhysicsToViewport =
        useCallback(() => {
            const viewport =
                viewportRef.current

            if (!viewport) {
                return
            }

            physicsRef.current.targetX =
                viewport.scrollLeft

            physicsRef.current.targetY =
                viewport.scrollTop

            physicsRef.current.velocityX = 0
            physicsRef.current.velocityY = 0
            physicsRef.current.inertia = false
        }, [])

    const stopPhysics =
        useCallback(() => {
            if (
                physicsFrameRef.current !== null
            ) {
                cancelAnimationFrame(
                    physicsFrameRef.current,
                )

                physicsFrameRef.current = null
            }

            syncPhysicsToViewport()
        }, [syncPhysicsToViewport])

    const startPhysicsLoop =
        useCallback(() => {
            if (
                physicsFrameRef.current !== null
            ) {
                return
            }

            let previousTime =
                performance.now()

            const frame = (time: number) => {
                const viewport =
                    viewportRef.current

                if (!viewport) {
                    physicsFrameRef.current =
                        null

                    return
                }

                const deltaTime = Math.min(
                    time - previousTime,
                    32,
                )

                previousTime = time

                const physics =
                    physicsRef.current

                const {
                    maxX,
                    maxY,
                } = getScrollBounds()

                if (physics.inertia) {
                    physics.targetX +=
                        physics.velocityX *
                        deltaTime

                    physics.targetY +=
                        physics.velocityY *
                        deltaTime

                    const clampedTargetX =
                        clamp(
                            physics.targetX,
                            0,
                            maxX,
                        )

                    const clampedTargetY =
                        clamp(
                            physics.targetY,
                            0,
                            maxY,
                        )

                    if (
                        clampedTargetX !==
                        physics.targetX
                    ) {
                        physics.velocityX = 0
                    }

                    if (
                        clampedTargetY !==
                        physics.targetY
                    ) {
                        physics.velocityY = 0
                    }

                    physics.targetX =
                        clampedTargetX

                    physics.targetY =
                        clampedTargetY

                    const friction =
                        Math.pow(
                            INERTIA_FRICTION,
                            deltaTime / 16.67,
                        )

                    physics.velocityX *=
                        friction

                    physics.velocityY *=
                        friction

                    if (
                        Math.abs(
                            physics.velocityX,
                        ) <
                            INERTIA_MIN_SPEED &&
                        Math.abs(
                            physics.velocityY,
                        ) <
                            INERTIA_MIN_SPEED
                    ) {
                        physics.velocityX = 0
                        physics.velocityY = 0
                        physics.inertia = false
                    }
                }

                physics.targetX = clamp(
                    physics.targetX,
                    0,
                    maxX,
                )

                physics.targetY = clamp(
                    physics.targetY,
                    0,
                    maxY,
                )

                const alpha =
                    1 -
                    Math.pow(
                        1 - SCROLL_LERP,
                        deltaTime / 16.67,
                    )

                const nextX =
                    viewport.scrollLeft +
                    (
                        physics.targetX -
                        viewport.scrollLeft
                    ) *
                        alpha

                const nextY =
                    viewport.scrollTop +
                    (
                        physics.targetY -
                        viewport.scrollTop
                    ) *
                        alpha

                viewport.scrollLeft = nextX
                viewport.scrollTop = nextY

                const distanceX =
                    Math.abs(
                        physics.targetX -
                            viewport.scrollLeft,
                    )

                const distanceY =
                    Math.abs(
                        physics.targetY -
                            viewport.scrollTop,
                    )

                const stillMoving =
                    physics.inertia ||
                    distanceX > 0.1 ||
                    distanceY > 0.1

                if (!stillMoving) {
                    viewport.scrollLeft =
                        physics.targetX

                    viewport.scrollTop =
                        physics.targetY

                    physicsFrameRef.current =
                        null

                    return
                }

                physicsFrameRef.current =
                    requestAnimationFrame(frame)
            }

            physicsFrameRef.current =
                requestAnimationFrame(frame)
        }, [getScrollBounds])

    useEffect(() => {
        return () => {
            if (
                physicsFrameRef.current !== null
            ) {
                cancelAnimationFrame(
                    physicsFrameRef.current,
                )
            }
        }
    }, [])

    const applyZoom = useCallback(
        (
            requestedZoom: number,
            anchorClientX?: number,
            anchorClientY?: number,
        ) => {
            const viewport =
                viewportRef.current

            if (!viewport) {
                return
            }

            stopPhysics()

            const currentZoom =
                zoomRef.current

            const nextZoom = clamp(
                requestedZoom,
                getMinZoom(),
                MAX_ZOOM,
            )

            if (nextZoom === currentZoom) {
                return
            }

            const rect =
                viewport.getBoundingClientRect()

            const anchorX =
                anchorClientX === undefined
                    ? viewport.clientWidth / 2
                    : anchorClientX -
                      rect.left

            const anchorY =
                anchorClientY === undefined
                    ? viewport.clientHeight / 2
                    : anchorClientY -
                      rect.top

            const paddingX =
                EDGE_PADDING

            const paddingY =
                EDGE_PADDING

            const logicalX =
                (
                    viewport.scrollLeft +
                    anchorX -
                    paddingX
                ) /
                currentZoom

            const logicalY =
                (
                    viewport.scrollTop +
                    anchorY -
                    paddingY
                ) /
                currentZoom

            zoomRef.current = nextZoom
            applyZoomStyles(nextZoom)

            const {
                maxX,
                maxY,
            } = getScrollBounds()

            viewport.scrollLeft = clamp(
                paddingX +
                    logicalX *
                        nextZoom -
                    anchorX,
                0,
                maxX,
            )

            viewport.scrollTop = clamp(
                paddingY +
                    logicalY *
                        nextZoom -
                    anchorY,
                0,
                maxY,
            )

            syncPhysicsToViewport()
            setZoom(nextZoom)
        },
        [
            applyZoomStyles,
            getMinZoom,
            getScrollBounds,
            stopPhysics,
            syncPhysicsToViewport,
        ],
    )

    useLayoutEffect(() => {
        const viewport =
            viewportRef.current

        if (
            !viewport ||
            positionedRef.current
        ) {
            return
        }

        positionedRef.current = true

        const initialZoom =
            zoomRef.current

        applyZoomStyles(initialZoom)

        viewport.scrollLeft =
            EDGE_PADDING +
            gallery.width *
                initialZoom *
                gallery.start.x -
            viewport.clientWidth / 2

        viewport.scrollTop =
            EDGE_PADDING +
            gallery.height *
                initialZoom *
                gallery.start.y -
            viewport.clientHeight / 2

        setViewportSize({
            width:
                viewport.clientWidth,
            height:
                viewport.clientHeight,
        })

        syncPhysicsToViewport()
    }, [
        applyZoomStyles,
        syncPhysicsToViewport,
    ])

    useEffect(() => {
        const viewport =
            viewportRef.current

        if (!viewport) {
            return
        }

        const handleResize = () => {
            setViewportSize({
                width:
                    viewport.clientWidth,
                height:
                    viewport.clientHeight,
            })

            applyZoomStyles(
                zoomRef.current,
            )

            const {
                maxX,
                maxY,
            } = getScrollBounds()

            viewport.scrollLeft =
                clamp(
                    viewport.scrollLeft,
                    0,
                    maxX,
                )

            viewport.scrollTop =
                clamp(
                    viewport.scrollTop,
                    0,
                    maxY,
                )

            syncPhysicsToViewport()
        }

        window.addEventListener(
            "resize",
            handleResize,
        )

        return () => {
            window.removeEventListener(
                "resize",
                handleResize,
            )
        }
    }, [
        applyZoomStyles,
        getScrollBounds,
        syncPhysicsToViewport,
    ])

    useEffect(() => {
        const viewport =
            viewportRef.current

        if (!viewport) {
            return
        }

        const handleWheel = (
            event: WheelEvent,
        ) => {
            event.preventDefault()

            if (
                event.ctrlKey ||
                event.metaKey
            ) {
                const sensitivity =
                    0.0015

                const nextZoom =
                    zoomRef.current *
                    Math.exp(
                        -event.deltaY *
                            sensitivity,
                    )

                applyZoom(
                    nextZoom,
                    event.clientX,
                    event.clientY,
                )

                return
            }

            const physics =
                physicsRef.current

            physics.inertia = false
            physics.velocityX = 0
            physics.velocityY = 0

            let deltaX = event.deltaX
            let deltaY = event.deltaY

            if (event.deltaMode === 1) {
                deltaX *= 16
                deltaY *= 16
            }

            if (event.deltaMode === 2) {
                deltaX *=
                    viewport.clientWidth

                deltaY *=
                    viewport.clientHeight
            }

            if (
                event.shiftKey &&
                Math.abs(deltaX) <
                    Math.abs(deltaY)
            ) {
                deltaX = deltaY
                deltaY = 0
            }

            const {
                maxX,
                maxY,
            } = getScrollBounds()

            physics.targetX = clamp(
                physics.targetX +
                    deltaX *
                        WHEEL_MULTIPLIER,
                0,
                maxX,
            )

            physics.targetY = clamp(
                physics.targetY +
                    deltaY *
                        WHEEL_MULTIPLIER,
                0,
                maxY,
            )

            startPhysicsLoop()
        }

        viewport.addEventListener(
            "wheel",
            handleWheel,
            {
                passive: false,
            },
        )

        return () => {
            viewport.removeEventListener(
                "wheel",
                handleWheel,
            )
        }
    }, [
        applyZoom,
        getScrollBounds,
        startPhysicsLoop,
    ])

    useEffect(() => {
        const viewport =
            viewportRef.current

        if (!viewport) {
            return
        }

        let startZoom =
            zoomRef.current

        const handleGestureStart = (
            event: Event,
        ) => {
            event.preventDefault()
            startZoom =
                zoomRef.current
        }

        const handleGestureChange = (
            event: Event,
        ) => {
            event.preventDefault()

            const gestureEvent =
                event as Event & {
                    scale?: number
                    clientX?: number
                    clientY?: number
                }

            applyZoom(
                startZoom *
                    (
                        gestureEvent.scale ??
                        1
                    ),
                gestureEvent.clientX,
                gestureEvent.clientY,
            )
        }

        const handleGestureEnd = (
            event: Event,
        ) => {
            event.preventDefault()
        }

        viewport.addEventListener(
            "gesturestart",
            handleGestureStart,
            {
                passive: false,
            } as AddEventListenerOptions,
        )

        viewport.addEventListener(
            "gesturechange",
            handleGestureChange,
            {
                passive: false,
            } as AddEventListenerOptions,
        )

        viewport.addEventListener(
            "gestureend",
            handleGestureEnd,
            {
                passive: false,
            } as AddEventListenerOptions,
        )

        return () => {
            viewport.removeEventListener(
                "gesturestart",
                handleGestureStart,
            )

            viewport.removeEventListener(
                "gesturechange",
                handleGestureChange,
            )

            viewport.removeEventListener(
                "gestureend",
                handleGestureEnd,
            )
        }
    }, [applyZoom])

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (selectedItem) {
                return
            }

            const zoomModifier =
                event.ctrlKey ||
                event.metaKey

            if (
                event.key === "+" ||
                event.key === "="
            ) {
                if (zoomModifier) {
                    event.preventDefault()
                }

                applyZoom(
                    zoomRef.current +
                        ZOOM_STEP,
                )

                return
            }

            if (event.key === "-") {
                if (zoomModifier) {
                    event.preventDefault()
                }

                applyZoom(
                    zoomRef.current -
                        ZOOM_STEP,
                )

                return
            }

            if (
                event.key === "0" &&
                zoomModifier
            ) {
                event.preventDefault()

                applyZoom(
                    getInitialZoom(),
                )
            }
        }

        document.addEventListener(
            "keydown",
            handleKeyDown,
        )

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            )
        }
    }, [
        applyZoom,
        selectedItem,
    ])

    const beginPinch = () => {
        const viewport =
            viewportRef.current

        const pointers =
            Array.from(
                pointersRef.current.values(),
            )

        if (
            !viewport ||
            pointers.length < 2
        ) {
            return
        }

        stopPhysics()

        for (
            const pointerId
            of pointersRef.current.keys()
        ) {
            if (
                !viewport.hasPointerCapture(
                    pointerId,
                )
            ) {
                viewport.setPointerCapture(
                    pointerId,
                )
            }
        }

        const [a, b] = pointers

        const distance =
            getDistance(a, b)

        const midpoint =
            getMidpoint(a, b)

        const rect =
            viewport.getBoundingClientRect()

        const localX =
            midpoint.x - rect.left

        const localY =
            midpoint.y - rect.top

        const paddingX =
            viewport.clientWidth / 2

        const paddingY =
            viewport.clientHeight / 2

        pinchRef.current = {
            distance,
            zoom: zoomRef.current,

            logicalX:
                (
                    viewport.scrollLeft +
                    localX -
                    paddingX
                ) /
                zoomRef.current,

            logicalY:
                (
                    viewport.scrollTop +
                    localY -
                    paddingY
                ) /
                zoomRef.current,
        }

        panRef.current = null
        draggedRef.current = true

        setDragging(true)
    }

    const handlePointerDown = (
        event:
            ReactPointerEvent<HTMLDivElement>,
    ) => {
        if (
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {
            return
        }

        const viewport =
            viewportRef.current

        if (!viewport) {
            return
        }

        stopPhysics()

        pointersRef.current.set(
            event.pointerId,
            {
                x: event.clientX,
                y: event.clientY,
            },
        )

        if (
            pointersRef.current.size >= 2
        ) {
            beginPinch()
            return
        }

        pinchRef.current = null
        draggedRef.current = false

        panRef.current = {
            pointerId:
                event.pointerId,

            startX: event.clientX,
            startY: event.clientY,

            lastX: event.clientX,
            lastY: event.clientY,
            lastTime:
                performance.now(),

            targetX:
                viewport.scrollLeft,

            targetY:
                viewport.scrollTop,

            velocityX: 0,
            velocityY: 0,
        }
    }

    const handlePointerMove = (
        event:
            ReactPointerEvent<HTMLDivElement>,
    ) => {
        if (
            !pointersRef.current.has(
                event.pointerId,
            )
        ) {
            return
        }

        const viewport =
            viewportRef.current

        if (!viewport) {
            return
        }

        pointersRef.current.set(
            event.pointerId,
            {
                x: event.clientX,
                y: event.clientY,
            },
        )

        if (
            pointersRef.current.size >= 2
        ) {
            if (!pinchRef.current) {
                beginPinch()
            }

            const pinch =
                pinchRef.current

            const pointers =
                Array.from(
                    pointersRef.current.values(),
                )

            if (
                !pinch ||
                pointers.length < 2
            ) {
                return
            }

            const [a, b] = pointers

            const distance =
                getDistance(a, b)

            if (pinch.distance <= 0) {
                return
            }

            const midpoint =
                getMidpoint(a, b)

            const rect =
                viewport.getBoundingClientRect()

            const localX =
                midpoint.x - rect.left

            const localY =
                midpoint.y - rect.top

            const nextZoom = clamp(
                pinch.zoom *
                    (
                        distance /
                        pinch.distance
                    ),
                getMinZoom(),
                MAX_ZOOM,
            )

            const paddingX =
                EDGE_PADDING

            const paddingY =
                EDGE_PADDING

            zoomRef.current = nextZoom
            applyZoomStyles(nextZoom)

            const {
                maxX,
                maxY,
            } = getScrollBounds()

            viewport.scrollLeft = clamp(
                paddingX +
                    pinch.logicalX *
                        nextZoom -
                    localX,
                0,
                maxX,
            )

            viewport.scrollTop = clamp(
                paddingY +
                    pinch.logicalY *
                        nextZoom -
                    localY,
                0,
                maxY,
            )

            syncPhysicsToViewport()
            setZoom(nextZoom)

            draggedRef.current = true
            setDragging(true)

            return
        }

        const pan =
            panRef.current

        if (
            !pan ||
            pan.pointerId !==
                event.pointerId
        ) {
            return
        }

        const deltaX =
            event.clientX -
            pan.startX

        const deltaY =
            event.clientY -
            pan.startY

        if (
            !draggedRef.current &&
            Math.hypot(
                deltaX,
                deltaY,
            ) >= DRAG_THRESHOLD
        ) {
            draggedRef.current = true
            setDragging(true)

            if (
                !viewport.hasPointerCapture(
                    event.pointerId,
                )
            ) {
                viewport.setPointerCapture(
                    event.pointerId,
                )
            }
        }

        if (!draggedRef.current) {
            return
        }

        const {
            maxX,
            maxY,
        } = getScrollBounds()

        const physics =
            physicsRef.current

        physics.inertia = false

        physics.targetX = clamp(
            pan.targetX -
                deltaX *
                    DRAG_MULTIPLIER,
            0,
            maxX,
        )

        physics.targetY = clamp(
            pan.targetY -
                deltaY *
                    DRAG_MULTIPLIER,
            0,
            maxY,
        )

        startPhysicsLoop()

        const now =
            performance.now()

        const deltaTime =
            Math.max(
                now - pan.lastTime,
                1,
            )

        const instantVelocityX =
            -(
                event.clientX -
                pan.lastX
            ) /
            deltaTime

        const instantVelocityY =
            -(
                event.clientY -
                pan.lastY
            ) /
            deltaTime

        pan.velocityX =
            pan.velocityX *
                0.78 +
            instantVelocityX *
                0.22

        pan.velocityY =
            pan.velocityY *
                0.78 +
            instantVelocityY *
                0.22

        pan.lastX = event.clientX
        pan.lastY = event.clientY
        pan.lastTime = now
    }

    const endPointer = (
        event:
            ReactPointerEvent<HTMLDivElement>,
    ) => {
        const viewport =
            viewportRef.current

        const pan =
            panRef.current

        const wasPinching =
            pinchRef.current !== null

        pointersRef.current.delete(
            event.pointerId,
        )

        if (
            viewport?.hasPointerCapture(
                event.pointerId,
            )
        ) {
            viewport.releasePointerCapture(
                event.pointerId,
            )
        }

        if (
            pointersRef.current.size >= 2
        ) {
            beginPinch()
            return
        }

        pinchRef.current = null

        if (
            pointersRef.current.size === 1 &&
            viewport
        ) {
            const [
                pointerId,
                pointer,
            ] =
                Array.from(
                    pointersRef.current.entries(),
                )[0]

            panRef.current = {
                pointerId,

                startX: pointer.x,
                startY: pointer.y,

                lastX: pointer.x,
                lastY: pointer.y,
                lastTime:
                    performance.now(),

                targetX:
                    physicsRef.current
                        .targetX,

                targetY:
                    physicsRef.current
                        .targetY,

                velocityX: 0,
                velocityY: 0,
            }

            return
        }

        panRef.current = null
        setDragging(false)

        if (
            !wasPinching &&
            draggedRef.current &&
            pan &&
            pan.pointerId ===
                event.pointerId
        ) {
            const releaseDelay =
                performance.now() -
                pan.lastTime

            const releaseFactor =
                clamp(
                    1 -
                        releaseDelay /
                            160,
                    0,
                    1,
                )

            const physics =
                physicsRef.current

            physics.velocityX =
                clamp(
                    pan.velocityX *
                        releaseFactor *
                        RELEASE_MULTIPLIER,
                    -MAX_RELEASE_SPEED,
                    MAX_RELEASE_SPEED,
                )

            physics.velocityY =
                clamp(
                    pan.velocityY *
                        releaseFactor *
                        RELEASE_MULTIPLIER,
                    -MAX_RELEASE_SPEED,
                    MAX_RELEASE_SPEED,
                )

            physics.inertia =
                Math.abs(
                    physics.velocityX,
                ) >=
                    INERTIA_MIN_SPEED ||
                Math.abs(
                    physics.velocityY,
                ) >=
                    INERTIA_MIN_SPEED

            if (physics.inertia) {
                startPhysicsLoop()
            }
        }

        window.setTimeout(() => {
            draggedRef.current = false
        }, 0)
    }

    const openItem = (
        item: GalleryItem,
    ) => {
        if (draggedRef.current) {
            return
        }

        stopPhysics()
        setSelectedItem(item)
    }

    return (
        <main className="gallery-page">
            <h1 className="sr-only">Gleb Milkevich’s personal gallery</h1>

            <RouteveilLink
                to={"/"}
                transition={{
                    name: "dissolve",
                    color: "#ffffff",
                }}
                type="button"
                className="gallery-back"
                aria-label="Back to home"
            >
                <ArrowLeft
                    size={20}
                    strokeWidth={2}
                />
            </RouteveilLink>

            <div
                ref={viewportRef}
                className={`gallery-viewport ${
                    dragging
                        ? "gallery-viewport-dragging"
                        : ""
                }`}
                onPointerDown={
                    handlePointerDown
                }
                onPointerMove={
                    handlePointerMove
                }
                onPointerUp={
                    endPointer
                }
                onPointerCancel={
                    endPointer
                }
            >
                <div
                    ref={spaceRef}
                    className="gallery-space"
                >
                    <div
                        ref={canvasRef}
                        className="gallery-canvas"
                    >
                        {gallery.items.map(
                            (item) => {
                                const size =
                                    getResponsiveItemSize(
                                        item,
                                        viewportSize,
                                    )

                                const style =
                                    {
                                        left:
                                            item.x,

                                        top:
                                            item.y,

                                        width:
                                            size.width,
                                    } satisfies CSSProperties

                                return (
                                    <button
                                        type="button"
                                        key={
                                            item.id
                                        }
                                        className="gallery-item"
                                        style={
                                            style
                                        }
                                        onClick={() =>
                                            openItem(
                                                item,
                                            )
                                        }
                                    >
                                        <div
                                            className="gallery-item-media-shell"
                                            style={{
                                                width:
                                                    size.width,

                                                height:
                                                    size.height,
                                            }}
                                        >
                                            <GalleryMedia
                                                item={
                                                    item
                                                }
                                                decorative
                                            />
                                        </div>

                                        {item.title && (
                                            <span className="gallery-item-title">
                                                {
                                                    item.title
                                                }
                                            </span>
                                        )}
                                    </button>
                                )
                            },
                        )}
                    </div>
                </div>
            </div>

            <div
                className="gallery-zoom"
                role="group"
                aria-label="Gallery zoom controls"
                onPointerDown={(
                    event,
                ) =>
                    event.stopPropagation()
                }
            >
                <button
                    type="button"
                    aria-label="Zoom out"
                    onClick={() =>
                        applyZoom(
                            zoomRef.current -
                                ZOOM_STEP,
                        )
                    }
                    disabled={
                        zoom <=
                        getMinZoom()
                    }
                >
                    −
                </button>

                <button
                    type="button"
                    className="gallery-zoom-value"
                    aria-label={`Reset zoom, current zoom ${Math.round(zoom * 100)}%`}
                    onClick={() =>
                        applyZoom(
                            getInitialZoom(),
                        )
                    }
                >
                    {Math.round(
                        zoom * 100,
                    )}
                    %
                </button>

                <button
                    type="button"
                    aria-label="Zoom in"
                    onClick={() =>
                        applyZoom(
                            zoomRef.current +
                                ZOOM_STEP,
                        )
                    }
                    disabled={
                        zoom >= MAX_ZOOM
                    }
                >
                    +
                </button>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        key={
                            selectedItem.id
                        }
                        item={
                            selectedItem
                        }
                        onClose={() =>
                            setSelectedItem(
                                null,
                            )
                        }
                    />
                )}
            </AnimatePresence>
        </main>
    )
}

export default GalleryPage

import date20260607 from "../../assets/gallery-optimized/2026-06-07.webp"
import audi from "../../assets/gallery-optimized/audi.webp"
import cafe from "../../assets/gallery-optimized/cafe.webp"
import carRide from "../../assets/gallery-optimized/car-ride.mp4"
import elevator from "../../assets/gallery-optimized/elevator.webp"
import fullSizeRender from "../../assets/gallery-optimized/FullSizeRender.webp"
import gasStationWalk from "../../assets/gallery-optimized/gas-station-walk.webp"
import firstGradeWTwin from "../../assets/gallery-optimized/IMG_7904 3.webp"
import lateNight from "../../assets/gallery-optimized/late-night.webp"
import littleGleb from "../../assets/gallery-optimized/little-gleb.webp"
import loml from "../../assets/gallery-optimized/loml.webp"
import newYear from "../../assets/gallery-optimized/new-year.webp"
import nicki from "../../assets/gallery-optimized/nicki.webp"
import nyWluv from "../../assets/gallery-optimized/ny-w-luv.webp"
import ocean from "../../assets/gallery-optimized/ocean.webp"
import oop from "../../assets/gallery-optimized/oop.mp4"
import pagoda from "../../assets/gallery-optimized/pagoda.webp"
import philly from "../../assets/gallery-optimized/philly.webp"
import picnic from "../../assets/gallery-optimized/picnic.webp"
import pict0140 from "../../assets/gallery-optimized/PICT0140.webp"
import selfie from "../../assets/gallery-optimized/selfie.webp"
import snowAngel from "../../assets/gallery-optimized/snow-angel.mp4"
import tesla from "../../assets/gallery-optimized/tesla.webp"
import temple from "../../assets/gallery-optimized/temple.webp"
import thinking from "../../assets/gallery-optimized/thinking.webp"
import vegaaasss from "../../assets/gallery-optimized/vegaaasss.mp4"
import yay from "../../assets/gallery-optimized/yay.webp"
import belmar from "../../assets/gallery-optimized/belmar.webp"

export type GalleryItem = {
    id: string
    type: "image" | "gif"
    src: string
    title?: string
    alt: string

    x: number
    y: number
    width: number
    height: number
}

export type GalleryConfig = {
    width: number
    height: number

    start: {
        x: number
        y: number
    }

    items: GalleryItem[]
}

export const gallery: GalleryConfig = {
    width: 5200,
    height: 3900,

    start: {
        x: 0.5,
        y: 0.5,
    },

    items: [
        {
            id: "elevator",
            type: "image",
            src: elevator,
            title: "elevator.png",
            alt: "Two people taking a mirror selfie in a wood-paneled elevator",
            x: 600,
            y: 930,
            width: 500,
            height: 667,
        },
        {
            id: "full-size-render",
            type: "image",
            src: fullSizeRender,
            title: "photoshoot.png",
            alt: "Black-and-white studio portrait session under a circular spotlight",
            x: 1175,
            y: 525,
            width: 500,
            height: 400,
        },
        {
            id: "tesla",
            type: "image",
            src: tesla,
            title: "tesla.png",
            alt: "Tesla display showing traffic and Pills N Potions playing",
            x: 1775,
            y: 410,
            width: 500,
            height: 500,
        },
        {
            id: "ny-w-luv",
            type: "image",
            src: nyWluv,
            title: "ny-w-luv.png",
            alt: "Man kissing a woman on the cheek with the New York skyline behind them",
            x: 2375,
            y: 400,
            width: 520,
            height: 395,
        },
        {
            id: "gas-station-walk",
            type: "image",
            src: gasStationWalk,
            title: "gas-station-walk.jpg",
            alt: "Friends walking together under streetlights at night",
            x: 4150,
            y: 1250,
            width: 450,
            height: 600,
        },
        {
            id: "oop",
            type: "gif",
            src: oop,
            title: "oop.gif",
            alt: "Person riding in a car under red lights",
            x: 1175,
            y: 1475,
            width: 450,
            height: 500,
        },
        {
            id: "nicki",
            type: "image",
            src: nicki,
            title: "nicki.png",
            alt: "Meme comparing Shakespeare and Nicki Minaj writing",
            x: 3100,
            y: 2925,
            width: 500,
            height: 395,
        },
        {
            id: "pagoda",
            type: "image",
            src: pagoda,
            title: "pagoda.png",
            alt: "Person silhouetted beside a red-lit pagoda overlooking a city at night",
            x: 1120,
            y: 2100,
            width: 500,
            height: 550,
        },
        {
            id: "selfie",
            type: "image",
            src: selfie,
            title: "selfie.png",
            alt: "Two people posing together for a mirror selfie",
            x: 2350,
            y: 3000,
            width: 650,
            height: 500,
        },
        {
            id: "late-night",
            type: "image",
            src: lateNight,
            title: "late-night.JPG",
            alt: "Residential street glowing under green streetlights at night",
            x: 3620,
            y: 2230,
            width: 500,
            height: 600,
        },
        {
            id: "picnic",
            type: "image",
            src: picnic,
            title: "picnic.png",
            alt: "Friends sharing a picnic on a sunny park lawn",
            x: 1210,
            y: 1020,
            width: 550,
            height: 400,
        },
        {
            id: "little-gleb",
            type: "image",
            src: littleGleb,
            title: "little-gleb.png",
            alt: "Gleb as a toddler wearing a pink bear costume with a rainbow",
            x: 575,
            y: 2350,
            width: 450,
            height: 500,
        },
        {
            id: "yay",
            type: "image",
            src: yay,
            title: "yay.png",
            alt: "Person leaping across a snowy street in front of houses",
            x: 1750,
            y: 2940,
            width: 500,
            height: 500,
        },
        {
            id: "temple",
            type: "image",
            src: temple,
            title: "temple.jpg",
            alt: "Person standing before an ornate Hindu temple in a black-and-white photo",
            x: 1120,
            y: 2760,
            width: 490,
            height: 650,
        },
        {
            id: "cafe",
            type: "image",
            src: cafe,
            title: "cafe.jpg",
            alt: "Friends seated around an outdoor cafe table at night",
            x: 4200,
            y: 1980,
            width: 500,
            height: 400,
        },
        {
            id: "loml",
            type: "image",
            src: loml,
            title: "loml.jpeg",
            alt: "Couple kissing beneath floating lanterns at night",
            x: 2375,
            y: 1710,
            width: 600,
            height: 430,
        },
        {
            id: "thinking",
            type: "image",
            src: thinking,
            title: "thinking.png",
            alt: "Meme of a woman thinking with the word thinking across the image",
            x: 1875,
            y: 1050,
            width: 350,
            height: 350,
        },
        {
            id: "img-7904-3",
            type: "image",
            src: firstGradeWTwin,
            title: "first-grade-w-twin.png",
            alt: "Twin brothers in matching uniforms on their first day of school",
            x: 2350,
            y: 900,
            width: 500,
            height: 667,
        },
        {
            id: "audi",
            type: "image",
            src: audi,
            title: "audi.png",
            alt: "Passenger riding in a convertible along a tree-lined road",
            x: 2410,
            y: 2275,
            width: 500,
            height: 600,
        },
        {
            id: "2026-06-07",
            type: "image",
            src: date20260607,
            title: "2026-06-07.JPG",
            alt: "Couple posing amid colorful light trails at an outdoor event",
            x: 3575,
            y: 1030,
            width: 500,
            height: 375,
        },
        {
            id: "belmar",
            type: "image",
            src: belmar,
            title: "belmar.png",
            alt: "Person looking toward the ocean from a beach entrance at sunset",
            x: 2975,
            y: 530,
            width: 500,
            height: 600,
        },
        {
            id: "car-ride",
            type: "gif",
            src: carRide,
            title: "car-ride.gif",
            alt: "Passenger leaning through an open car sunroof",
            x: 3075,
            y: 1750,
            width: 400,
            height: 500,
        },
        {
            id: "philly",
            type: "image",
            src: philly,
            title: "philly.jpg",
            alt: "Two friends taking a rooftop selfie with the Philadelphia skyline at night",
            x: 3570,
            y: 1500,
            width: 500,
            height: 600,
        },
        {
            id: "vegaaasss",
            type: "gif",
            src: vegaaasss,
            title: "vegaaasss.gif",
            alt: "People walking toward the illuminated Las Vegas Sphere at night",
            x: 3020,
            y: 2360,
            width: 500,
            height: 450,
        },
        {
            id: "snow-angel",
            type: "gif",
            src: snowAngel,
            title: "snow-angel.GIF",
            alt: "Three people making snow angels beside a chain-link fence",
            x: 1700,
            y: 2325,
            width: 600,
            height: 500,
        },
        {
            id: "ocean",
            type: "image",
            src: ocean,
            title: "ocean.png",
            alt: "Two people standing at the edge of the ocean at sunset",
            x: 1720,
            y: 1540,
            width: 525,
            height: 665,
        },
        {
            id: "new-year",
            type: "image",
            src: newYear,
            title: "new-year.png",
            alt: "Overhead view of three people eating beside a decorated Christmas tree",
            x: 535,
            y: 1700,
            width: 500,
            height: 550,
        },
        {
            id: "pict-0140",
            type: "image",
            src: pict0140,
            title: "PICT0140.png",
            alt: "Three friends posing close together for a photo",
            x: 2950,
            y: 1250,
            width: 540,
            height: 369,
        },
    ],
}

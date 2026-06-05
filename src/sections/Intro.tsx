/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

const introCss = {
    fontSize: "2rem",
    color: "white",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
}

export default function Intro() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count >= 100) return;
        
        const interval = setInterval(() => {
            setCount((prevCount) => {
                const newCount = prevCount + 1;
                return newCount > 100 ? 100 : newCount;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [count])

    return (
        <div style={{transform: count === 100 ? `translateY(-100%)` : undefined, transition: "transform 0.5s ease"}} css={introCss}>
            {count}
        </div>
    )
}
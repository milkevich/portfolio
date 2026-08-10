import { useEffect, useState } from 'react'
import '../../shared.css'

const PORTFOLIO_TIME_ZONE = 'America/New_York'

function getPortfolioDateTime(date = new Date()) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: PORTFOLIO_TIME_ZONE,
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date)
}

function Footer() {
    const [dateTime, setDateTime] = useState(() => getPortfolioDateTime())

    useEffect(() => {
        const update = () => setDateTime(getPortfolioDateTime())
        update()

        const interval = window.setInterval(update, 30_000)
        return () => window.clearInterval(interval)
    }, [])

    return (
        <footer className="footer-container">
            <p>© {new Date().getFullYear()}</p>
            <p>{dateTime}</p>
        </footer>
    )
}

export default Footer

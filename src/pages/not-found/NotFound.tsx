import { ArrowLeft } from 'lucide-react'
import './NotFound.css'
import { RouteveilLink } from 'routeveil/react-router'

function NotFound() {

    return (
        <main className="main-container">
            <RouteveilLink to={"/"} transition="fade" className="arrow-back-container" aria-label="Back to home">
                <ArrowLeft/>
            </RouteveilLink>
            <div className="content-container">
                <h1 aria-label="Page not found">\(0_0)/</h1>
            </div>
        </main>
    )
}

export default NotFound

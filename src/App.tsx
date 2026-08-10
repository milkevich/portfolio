import './shared.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import Project from './pages/project/Project'
import GalleryPage from './pages/gallery/GalleryPage'
import Seo from './Seo'

function App() {

  return (
    <>
      <Seo />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects/:projectName' element={<Project />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

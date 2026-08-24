import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from '@/components/blocks/Nav'
import { Footer } from '@/components/blocks/Footer'
import { WhatsAppFab } from '@/components/blocks/WhatsAppFab'
import Home from '@/pages/Home'
import Placeholder from '@/pages/Placeholder'
import NotFound from '@/pages/NotFound'

/** Reset scroll on navigation, but leave in-page anchors alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />
      <Nav />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Phase 2 */}
          <Route
            path="/pricing"
            element={<Placeholder title="Pricing" phase="Phase 2" path="/pricing" />}
          />
          <Route
            path="/about"
            element={<Placeholder title="Meet the Team" phase="Phase 2" path="/about" />}
          />
          <Route
            path="/enterprise"
            element={
              <Placeholder title="Enterprise AI Solutions" phase="Phase 2" path="/enterprise" />
            }
          />

          {/* Phase 3 */}
          <Route
            path="/services"
            element={<Placeholder title="Services" phase="Phase 3" path="/services" />}
          />
          <Route
            path="/services/:slug"
            element={<Placeholder title="Service" phase="Phase 3" path="/services" />}
          />
          <Route
            path="/past-projects"
            element={
              <Placeholder title="See Our Work" phase="Phase 3" path="/past-projects" />
            }
          />

          {/* Legal — replaces the reference site's dead "#" links */}
          <Route
            path="/privacy"
            element={<Placeholder title="Privacy Policy" phase="Phase 2" path="/privacy" />}
          />
          <Route
            path="/terms"
            element={<Placeholder title="Terms of Service" phase="Phase 2" path="/terms" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  )
}

import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from '@/components/blocks/Nav'
import { Footer } from '@/components/blocks/Footer'
import { WhatsAppFab } from '@/components/blocks/WhatsAppFab'
import Home from '@/pages/Home'
import Priya from '@/pages/Priya'
import Pricing from '@/pages/Pricing'
import About from '@/pages/About'
import Enterprise from '@/pages/Enterprise'
import Services from '@/pages/Services'
import Automations from '@/pages/Automations'
import PastProjects from '@/pages/PastProjects'
import Placeholder from '@/pages/Placeholder'
import NotFound from '@/pages/NotFound'

/*
  The eight service detail pages share one template but carry the largest
  content module on the site. Splitting them keeps that weight off the
  homepage bundle — nobody lands on /services/geo first.
*/
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))

/**
 * Holds the page height while a lazy route loads, so the footer does not jump
 * up to meet the nav and then drop again. Deliberately blank: a spinner that
 * flashes for 80ms is worse than nothing.
 */
function RouteFallback() {
  return <div aria-hidden="true" style={{ minHeight: '70vh' }} />
}

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

          {/* The flagship product. Eager, not lazy — it is the page the ads
              point at, and a route-split spinner on the landing target is the
              one place the split costs more than it saves. */}
          <Route path="/priya" element={<Priya />} />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/enterprise" element={<Enterprise />} />

          <Route path="/automations" element={<Automations />} />

          <Route path="/services" element={<Services />} />
          <Route
            path="/services/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServiceDetail />
              </Suspense>
            }
          />
          <Route path="/past-projects" element={<PastProjects />} />

          {/* Legal — real routes, but they still need real legal copy. */}
          <Route
            path="/privacy"
            element={<Placeholder title="Privacy Policy" path="/privacy" />}
          />
          <Route
            path="/terms"
            element={<Placeholder title="Terms of Service" path="/terms" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  )
}

import { useParams } from 'react-router-dom'
import { ServicePage } from '@/components/templates/ServicePage'
import { getService } from '@/content/services'
import NotFound from './NotFound'

/**
 * Route wrapper. An unknown slug is a genuine 404, not an empty page — the
 * URL is user-editable and search engines will find the bad ones.
 */
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  if (!service) return <NotFound />

  // Keyed on slug so navigating between two service pages remounts the
  // template. Without it the reveal state and open accordion panels carry
  // over from the previous service, which reads as a broken page.
  return <ServicePage key={service.slug} service={service} />
}

'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

const pathNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  properties: 'Properties',
  pipeline: 'Pipeline',
  inbox: 'Inbox',
  settings: 'Settings'
}

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  // Don't show breadcrumbs on the main dashboard page
  if (pathname === '/dashboard') {
    return null
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1

    return {
      label,
      href,
      isLast
    }
  })

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home/Dashboard link */}
        <li>
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-300 mx-2" />
            
            {item.isLast ? (
              <span className="text-sm font-medium text-gray-900">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
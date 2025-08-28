'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { 
  Building, 
  LayoutDashboard, 
  GitBranch, 
  Mail, 
  Settings, 
  LogOut,
  X,
  User
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: 'Properties',
    href: '/dashboard/properties',
    icon: Building,
    badge: null
  },
  {
    name: 'Pipeline',
    href: '/dashboard/pipeline',
    icon: GitBranch,
    badge: 3
  },
  {
    name: 'Inbox',
    href: '/dashboard/inbox',
    icon: Mail,
    badge: 5
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null
  }
]

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300"
        onClick={() => setOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 flex w-full max-w-xs">
        <div className="flex grow flex-col bg-white">
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Property Pro</h1>
                  <p className="text-xs text-gray-500">Tenant Management</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href || 
                        (item.href !== '/dashboard' && pathname.startsWith(item.href))
                      
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`
                              group flex items-center justify-between gap-x-3 rounded-md px-2 py-2 text-sm font-semibold leading-6
                              ${isActive 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                              }
                            `}
                          >
                            <div className="flex items-center gap-x-3">
                              <item.icon
                                className={`h-6 w-6 shrink-0 ${
                                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </div>
                            
                            {item.badge && (
                              <span className={`
                                inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full
                                ${isActive 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-red-100 text-red-700'
                                }
                              `}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>

                {/* User section */}
                <li className="mt-auto border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="sr-only">Your profile</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
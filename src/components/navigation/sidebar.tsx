'use client'

import { useState } from 'react'
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
  ChevronRight,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: false,
    badge: null
  },
  {
    name: 'Properties',
    href: '/dashboard/properties',
    icon: Building,
    current: false,
    badge: null
  },
  {
    name: 'Pipeline',
    href: '/dashboard/pipeline',
    icon: GitBranch,
    current: false,
    badge: 3 // Number of pending applications
  },
  {
    name: 'Inbox',
    href: '/dashboard/inbox',
    icon: Mail,
    current: false,
    badge: 5 // Unread messages
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    current: false,
    badge: null
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo and brand area */}
      <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Property Pro</h1>
              <p className="text-xs text-gray-500">Tenant Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 flex flex-col px-3 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-200 hover:bg-blue-50
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <item.icon 
                      className={`
                        mr-3 h-5 w-5 transition-colors duration-200
                        ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}
                      `} 
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                  
                  {!isCollapsed && item.badge && (
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
      </nav>

      {/* User profile section */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="flex items-center">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full text-gray-400 hover:text-gray-600"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <ChevronRight 
          className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${
            isCollapsed ? 'rotate-0' : 'rotate-180'
          }`} 
        />
      </button>
    </div>
  )
}
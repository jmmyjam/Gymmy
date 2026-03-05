import { Outlet, NavLink } from 'react-router-dom'

export default function MainLayout() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/planner', label: 'Plan Visit' },
    { to: '/progress', label: 'Progress' },
    { to: '/toolkit', label: 'Toolkit' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">GymShy</span>
        <div className="flex gap-6">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-500 hover:text-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
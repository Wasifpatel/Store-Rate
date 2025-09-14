import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Building, Shield, LayoutDashboard, Store, Users, ShoppingBasket } from "lucide-react"

import { useAuth } from "@/components/auth/use-auth"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"

const adminNav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/stores", icon: Store, label: "Manage Stores" },
  { href: "/admin/users", icon: Users, label: "Manage Users" },
]

const ownerNav = [
    { href: "/owner/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];


const userNav = [
    { href: "/stores", icon: ShoppingBasket, label: "Browse Stores" },
]

export function AppSidebar() {
  const { user } = useAuth()
  const location = useLocation()
  const pathname = location.pathname

  if (!user) {
    return null
  }
  
  const getNavItems = () => {
    switch(user.role) {
      case 'admin':
        return adminNav;
      case 'owner':
        return ownerNav;
      default:
        return userNav;
    }
  }

  const navItems = getNavItems()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Building className="size-7 text-primary" />
            <span className="text-lg font-semibold font-headline">Store Rate</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {user.role === "admin" && (
            <div className="flex items-center gap-2 rounded-lg bg-yellow-500/10 p-2 text-yellow-500 dark:text-yellow-400">
                <Shield className="size-5" />
                <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin Mode</span>
                <span className="text-xs">Full system access</span>
                </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

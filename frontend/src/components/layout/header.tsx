import { Link } from 'react-router-dom';
import { Building, LogOut, User as UserIcon, PanelLeft, ShieldCheck, Crown, User, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/auth/use-auth';
import { useSidebar } from '@/components/ui/sidebar';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const { toggleSidebar, state } = useSidebar();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  const getHomePath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'owner':
        return '/owner/dashboard';
      default:
        return '/stores';
    }
  };

  const RoleIcon = ({ role }: { role: 'admin' | 'owner' | 'user' }) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="w-4 h-4 text-destructive" />;
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      default:
        return <User className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
            {user && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={toggleSidebar}>
                  {state === 'expanded' ? <PanelLeftOpen className="h-6 w-6" /> : <PanelLeft className="h-6 w-6" />}
                  <span className="sr-only">Toggle Sidebar</span>
              </Button>
            )}
            <Link to={getHomePath()} className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block font-headline">Store Rate MVP</span>
            </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-sm text-muted-foreground flex items-center gap-2">
                  <RoleIcon role={user.role} />
                  <span>Logged in as <b>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</b></span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

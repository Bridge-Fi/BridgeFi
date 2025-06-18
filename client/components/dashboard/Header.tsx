"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MenuIcon,
  Scale,
  Building2,
  DollarSign,
  Info,
  Briefcase,
  UserIcon,
  CalendarIcon,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { UserAPI } from "@/app/api/UserAPI";
import type React from "react";

// Define nav item type including optional userOnly flag
interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  userOnly?: boolean;
}

interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

export function Header() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check authentication state
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await UserAPI.getLoggedUser();
        if (!(user instanceof Error)) {
          setLoggedUser(user);
        }
      } catch {
        setLoggedUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname]);

  const isAuthenticated = Boolean(loggedUser);

  // Get user display name
  const getUserDisplayName = () => {
    if (!loggedUser) return "User";

    // Try different name properties that might exist
    if (loggedUser.fullName) return loggedUser.fullName;
    if (loggedUser.firstName && loggedUser.lastName) {
      return `${loggedUser.firstName} ${loggedUser.lastName}`;
    }
    if (loggedUser.firstName) return loggedUser.firstName;

    // Fallback to email username
    return loggedUser.email.split("@")[0];
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Logout handler
  const handleLogout = async () => {
    setLogoutLoading(true);
    await UserAPI.logout();
    setLoggedUser(null);
    window.location.href = "/";
  };

  // Hide header on specific routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/lawyer-login") ||
    pathname.startsWith("/lawyer-dashboard")
  ) {
    return null;
  }

  // Public navigation
  const publicNav: NavItem[] = [
    { name: "Home", href: "/", icon: Info },
    { name: "About Us", href: "/about", icon: Briefcase },
    { name: "Services", href: "/services", icon: Briefcase },
  ];

  // Private navigation for authenticated users
  const privateNav: NavItem[] = [
    { name: "Find Lawyers", href: "/lawyer", icon: Scale },
    {
      name: "My Appointments",
      href: "/user/appointments",
      icon: CalendarIcon,
      userOnly: true,
    },
    { name: "Employer Hub", href: "/employer-hub", icon: Building2 },
    {
      name: "Financial Resources",
      href: "/financial-resources",
      icon: DollarSign,
    },
  ];

  const navItems = isAuthenticated ? privateNav : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">BF</span>
          </div>
          <span className="text-xl font-bold">BridgeFi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems
            .filter(
              (item) =>
                !item.userOnly ||
                (item.userOnly &&
                  isAuthenticated &&
                  loggedUser?.role === "user")
            )
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitials(getUserDisplayName())}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{getUserDisplayName()}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {loggedUser?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                {loggedUser?.role === "user"}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDialogOpen(true)}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading && !isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/login")}
              >
                <UserIcon className="h-4 w-4 mr-2" /> Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => (window.location.href = "/sign-up")}
              >
                Get Started
              </Button>
            </>
          ) : null}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              {isAuthenticated && (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(getUserDisplayName())}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{getUserDisplayName()}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {loggedUser?.email}
                      </p>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Profile Settings</span>
                    </Link>
                  </div>
                </>
              )}

              {navItems
                .filter(
                  (item) =>
                    !item.userOnly ||
                    (item.userOnly &&
                      isAuthenticated &&
                      loggedUser?.role === "user")
                )
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 text-lg font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted",
                      pathname === item.href
                        ? "text-primary bg-muted"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.name}</span>
                  </Link>
                ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2 border-t">
                {!loading && isAuthenticated ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setDialogOpen(true)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : !loading ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => (window.location.href = "/login")}
                    >
                      <UserIcon className="h-4 w-4 mr-2" /> Sign In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => (window.location.href = "/sign-up")}
                    >
                      Get Started
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logout Confirmation Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Log Out"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

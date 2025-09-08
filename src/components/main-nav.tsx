"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Sparkles,
} from "lucide-react";

import { useUserRole } from "@/hooks/use-user-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const studentNav = [
  { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/registrations", label: "My Registrations", icon: BookOpen },
  { href: "/student/ask", label: "Ask Teacher", icon: Sparkles },
  { href: "/student/notifications", label: "Notifications", icon: Bell },
  { href: "/student/profile", label: "Profile", icon: Settings },
];

const teacherNav = [
  { href: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/events", label: "Manage Events", icon: Calendar },
  { href: "/teacher/events/create", label: "Create Event", icon: PlusCircle },
  { href: "/teacher/assistant", label: "AI Assistant", icon: Sparkles },
];

export function MainNav({ children }: { children: React.ReactNode }) {
  const role = useUserRole();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      router.push('/login');
    }
  }, [router]);

  const navItems = role === "teacher" ? teacherNav : studentNav;

  if (!role) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <GraduationCap className="h-16 w-16 animate-pulse text-primary" />
        </div>
    );
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4 justify-between flex flex-row items-center">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
              MyCampusConnect
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="!m-0 !rounded-none !shadow-none !bg-transparent">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://picsum.photos/seed/${role}/100`} alt="User avatar" />
                  <AvatarFallback>{role === 'student' ? 'S' : 'T'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none capitalize">{role}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {role === 'student' ? 'student@test.com' : 'teacher@test.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}

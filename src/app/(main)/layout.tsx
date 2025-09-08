import { SidebarProvider } from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainNav>
        {children}
      </MainNav>
    </SidebarProvider>
  );
}

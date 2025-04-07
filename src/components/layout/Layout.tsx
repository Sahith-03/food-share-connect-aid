
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSidebar } from "./SidebarProvider";

const Layout = () => {
  const { sidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
        <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} FoodShare Connect. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;

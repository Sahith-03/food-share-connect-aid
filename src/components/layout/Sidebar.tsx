
import { NavLink } from "react-router-dom";
import { Home, Package, Users, User, Settings } from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [userRole, setUserRole] = useState<string>("donor"); // Default role
  
  useEffect(() => {
    // Get user role from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    }
  }, []);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-food-green-800 text-white transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 py-4 border-b border-food-green-700">
        <div className="flex items-center space-x-2">
          {sidebarOpen && (
            <span className="text-xl font-bold">FoodShare</span>
          )}
          {!sidebarOpen && <span className="text-xl font-bold">FS</span>}
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex h-8 w-8 items-center justify-center rounded-full hover:bg-food-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-5 w-5 transition-all", sidebarOpen ? "rotate-180" : "rotate-0")}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid gap-1 px-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  "hover:bg-food-green-700",
                  isActive ? "bg-food-green-700 text-white" : "text-food-green-100"
                )
              }
            >
              <Home className="h-5 w-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </NavLink>
          </li>
          
          {/* Food Items - visible to all but labeled differently */}
          <li>
            <NavLink
              to="/food-items"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  "hover:bg-food-green-700",
                  isActive ? "bg-food-green-700 text-white" : "text-food-green-100"
                )
              }
            >
              <Package className="h-5 w-5" />
              {sidebarOpen && (
                <span>{userRole === "donor" ? "My Donations" : "Available Food"}</span>
              )}
            </NavLink>
          </li>
          
          {/* Distributions - visible to all but labeled differently */}
          <li>
            <NavLink
              to="/distributions"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  "hover:bg-food-green-700",
                  isActive ? "bg-food-green-700 text-white" : "text-food-green-100"
                )
              }
            >
              <Users className="h-5 w-5" />
              {sidebarOpen && (
                <span>{userRole === "donor" ? "My Distributions" : "Received Donations"}</span>
              )}
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  "hover:bg-food-green-700",
                  isActive ? "bg-food-green-700 text-white" : "text-food-green-100"
                )
              }
            >
              <User className="h-5 w-5" />
              {sidebarOpen && <span>Profile</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto border-t border-food-green-700 px-4 py-4">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-food-green-100 transition-all hover:bg-food-green-700"
        >
          <Settings className="h-5 w-5" />
          {sidebarOpen && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
}

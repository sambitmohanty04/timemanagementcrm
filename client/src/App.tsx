import { useEffect, useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import MobileSidebar from "./components/layout/MobileSidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [activeTaskFilter, setActiveTaskFilter] =
    useState("today");

  const [tasksExpanded, setTasksExpanded] =
    useState(true);

  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [quickCreateOpen, setQuickCreateOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [aiActive, setAiActive] =
    useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".dropdown-container")) {
        setProfileDropdownOpen(false);
        setNotificationsOpen(false);
        setQuickCreateOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 font-sans flex flex-col overflow-x-hidden">
      <div className="relative z-10 flex flex-1 h-screen overflow-hidden">
        {/* Desktop Sidebar */}

        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
          activeTaskFilter={activeTaskFilter}
          setActiveTab={setActiveTab}
          setActiveTaskFilter={setActiveTaskFilter}
          tasksExpanded={tasksExpanded}
          setTasksExpanded={setTasksExpanded}
        />

        {/* Mobile Sidebar */}

        <MobileSidebar
          open={mobileMenuOpen}
          setOpen={setMobileMenuOpen}
          activeTab={activeTab}
          activeTaskFilter={activeTaskFilter}
          setActiveTab={setActiveTab}
          setActiveTaskFilter={setActiveTaskFilter}
        />

        {/* Main */}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            activeTab={activeTab}
            activeTaskFilter={activeTaskFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setMobileMenuOpen={setMobileMenuOpen}
            aiActive={aiActive}
            setAiActive={setAiActive}
            profileDropdownOpen={profileDropdownOpen}
            setProfileDropdownOpen={
              setProfileDropdownOpen
            }
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
            quickCreateOpen={quickCreateOpen}
            setQuickCreateOpen={setQuickCreateOpen}
          />

          <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
            <Dashboard
              activeTab={activeTab}
              activeTaskFilter={activeTaskFilter}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

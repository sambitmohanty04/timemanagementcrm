import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import MobileSidebar from "./components/layout/MobileSidebar";
import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Calendar from "./pages/Calendar";
import TimeTracker from "./pages/TimeTracker";
import FocusMode from "./pages/FocusMode";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Goals from "./pages/Goals";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";

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
    <BrowserRouter>
      <div
        className={`min-h-screen font-sans flex flex-col overflow-x-hidden ${
          darkMode
            ? "bg-[#0B0F17] text-slate-200"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="relative z-10 flex flex-1 h-screen overflow-hidden">

          {/* =========================================
              DESKTOP SIDEBAR
          ========================================= */}

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

          {/* ===MOBILE SIDEBAR==== */}
          <MobileSidebar
            open={mobileMenuOpen}
            setOpen={setMobileMenuOpen}
            activeTab={activeTab}
            activeTaskFilter={activeTaskFilter}
            setActiveTab={setActiveTab}
            setActiveTaskFilter={setActiveTaskFilter}
          />

          {/* ===MAIN AREA=== */}

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

            {/* Header */}

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
              profileDropdownOpen={
                profileDropdownOpen
              }
              setProfileDropdownOpen={
                setProfileDropdownOpen
              }
              notificationsOpen={
                notificationsOpen
              }
              setNotificationsOpen={
                setNotificationsOpen
              }
              quickCreateOpen={
                quickCreateOpen
              }
              setQuickCreateOpen={
                setQuickCreateOpen
              }
            />

            {/* ===ROUTES=== */}

            <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">

              <Routes>

                {/* Dashboard */}
                <Route
                  path="/"
                  element={
                    <Dashboard
                      activeTab={activeTab}
                      activeTaskFilter={
                        activeTaskFilter
                      }
                    />
                  }
                />
                {/* My Tasks */}
                <Route
                  path="/tasks"
                  element={<MyTasks />}
                />
                {/* Calendar */}
                <Route
                  path="/calendar"
                  element={<Calendar />}
                />
                {/* Calendar */}
                <Route
                  path="/time-tracker"
                  element={<TimeTracker />}
                />
                {/* Focus Mode */}
                <Route
                  path="/focus-mode"
                  element={<FocusMode />}
                />
                {/* Projects */}
                <Route
                  path="/projects"
                  element={<Projects />}
                />
                {/* Project Details */}
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetails />}
                />
                {/* Goals */}
                <Route
                  path="/goals"
                  element={<Goals />}
                />
                {/* Habits */}
                <Route
                  path="/habits"
                  element={<Habits />}
                />
                {/* Analytics */}
                <Route
                  path="/analytics"
                  element={<Analytics />}
                />

              </Routes>

            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
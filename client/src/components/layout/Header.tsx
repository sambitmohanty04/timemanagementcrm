import type { Dispatch, SetStateAction } from "react";
import {
  Bell,Bot, ChevronDown, Menu, Plus, Search,
  Sun, Moon
} from "lucide-react";

import { NAV_ITEMS } from "../../data/navigation";

interface HeaderProps {
  activeTab: string;
  activeTaskFilter: string;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  aiActive: boolean;
  setAiActive: Dispatch<SetStateAction<boolean>>;
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: Dispatch<SetStateAction<boolean>>;
  notificationsOpen: boolean;
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  quickCreateOpen: boolean;
  setQuickCreateOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  activeTab,
  activeTaskFilter,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  setMobileMenuOpen,
  aiActive,
  setAiActive,
  profileDropdownOpen,
  setProfileDropdownOpen,
  notificationsOpen,
  setNotificationsOpen,
  quickCreateOpen,
  setQuickCreateOpen,
}: HeaderProps) {
  const activeItem = NAV_ITEMS.find(
    (item) => item.id === activeTab
  );

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0F1523]/70 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400 font-medium hidden sm:inline">
            Workspace
          </span>

          <span className="text-slate-600 hidden sm:inline">
            /
          </span>

          <span className="text-white font-semibold">
            {activeItem?.label ?? "Dashboard"}
          </span>

          {activeTab === "tasks" && (
            <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 capitalize">
              {activeTaskFilter}
            </span>
          )}
        </div>
      </div>

      {/* Search */}

      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search tasks, projects, AI prompts..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-12 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
          />

          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-2.5">
        {/* AI */}

        <button
          type="button"
          onClick={() => setAiActive((prev) => !prev)}
          className={`hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-medium ${
            aiActive
              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
              : "bg-slate-800/40 border-slate-800 text-slate-400"
          }`}
        >
          <div className="relative">
            <Bot className="w-3.5 h-3.5" />

            {aiActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          <span>
            {aiActive
              ? "AI Copilot Active"
              : "AI Paused"}
          </span>
        </button>

        {/* Create */}

        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() =>
              setQuickCreateOpen((prev) => !prev)
            }
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">
              Create
            </span>
          </button>

          {quickCreateOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0F1523] border border-slate-800 shadow-2xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Quick Actions
              </div>

              {["New Task", "New Project", "New Goal"].map(
                (action) => (
                  <button
                    type="button"
                    key={action}
                    onClick={() =>
                      setQuickCreateOpen(false)
                    }
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  >
                    {action}
                  </button>
                )
              )}
            </div>
          )}
        </div>
        
        {/* Theme Toggle */}
        <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="relative rounded-lg p-2.5 text-gray-400 transition-all duration-200 hover:bg-slate-800/60 hover:text-gray-400 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
        </button>
        {/* Notification */}

        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen((prev) => !prev)
            }
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 relative"
          >
            <Bell className="w-4 h-4" />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0F1523]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0F1523] border border-slate-800 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-white">
                  Notifications
                </span>

                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">
                  2 new
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-slate-800/40">
                  <p className="text-xs text-slate-200 font-medium">
                    AI Rescheduled 3 tasks
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Optimal focus block generated for today
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-800/40">
                  <p className="text-xs text-slate-200 font-medium">
                    Goal Deadline Reaching
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Cellexa V1 launch due in 2 days
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-[1px] bg-slate-800 mx-1" />

        {/* Profile */}

        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() =>
              setProfileDropdownOpen((prev) => !prev)
            }
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
              <div className="w-full h-full rounded-[11px] bg-indigo-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  SA
                </span>
              </div>
            </div>

            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white">
                Sam
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F1523] border border-slate-800 shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-semibold text-white">
                  Sam
                </p>

                <p className="text-[10px] text-slate-400">
                  alex.rivera@chronos.io
                </p>
              </div>

              <button className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg">
                My Profile
              </button>

              <button className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg">
                Security & Billing
              </button>

              <button className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg">
                Help & Support
              </button>

              <div className="my-1 border-t border-slate-800" />

              <button className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

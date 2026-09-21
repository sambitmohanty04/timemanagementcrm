import type { Dispatch, SetStateAction } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";

import { NAV_ITEMS } from "../../data/navigation";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  activeTaskFilter: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setActiveTaskFilter: Dispatch<SetStateAction<string>>;
  tasksExpanded: boolean;
  setTasksExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  activeTab,
  activeTaskFilter,
  setActiveTab,
  setActiveTaskFilter,
  tasksExpanded,
  setTasksExpanded,
}: SidebarProps) {
  const handleNavClick = (
    itemId: string,
    subFilter?: string
  ) => {
    setActiveTab(itemId);

    if (subFilter) {
      setActiveTaskFilter(subFilter);
    }
  };

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-slate-800/80
      bg-[#0F1523]/90 backdrop-blur-xl transition-all duration-300
      relative z-30 select-none
      ${collapsed ? "w-[78px]" : "w-[260px]"}`}
    >
      {/* Header */}

      <div className="h-16 border-b border-slate-800/80 flex items-center justify-between px-4">
        <div
          className={`flex items-center gap-3 overflow-hidden ${
            collapsed ? "justify-center w-full" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shrink-0">
            <div className="w-full h-full bg-[#0F1523] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base text-white">
                SB
                <span className="ml-1.5 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CRM
                </span>
              </span>

              <span className="text-[11px] text-slate-400 font-medium">
                Time & Workspace
              </span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expand */}

      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-indigo-600 text-white border border-slate-700 flex items-center justify-center shadow-md hover:bg-indigo-500 z-40"
          title="Expand Sidebar"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const hasSubItems =
            Boolean(item.subItems?.length);

          return (
            <div key={item.id} className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  if (hasSubItems && !collapsed) {
                    setTasksExpanded((prev) => !prev);
                    handleNavClick(item.id, "today");
                  } else {
                    handleNavClick(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/90 to-indigo-700/80 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? "text-white"
                        : item.spark
                          ? "text-indigo-400"
                          : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />

                  {!collapsed && (
                    <span className="truncate">
                      {item.label}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide ${
                          item.badgeColor ??
                          "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {hasSubItems &&
                      (tasksExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </div>
                )}

                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-400 rounded-r-full" />
                )}
              </button>

              {/* Sub Items */}

              {hasSubItems &&
                !collapsed &&
                tasksExpanded && (
                  <div className="ml-4 pl-3 border-l border-slate-800/80 space-y-1 my-1">
                    {item.subItems?.map((sub) => {
                      const SubIcon = sub.icon;

                      const isSubActive =
                        activeTab === "tasks" &&
                        activeTaskFilter === sub.filter;

                      return (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() =>
                            handleNavClick(
                              "tasks",
                              sub.filter
                            )
                          }
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSubActive
                              ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <SubIcon
                              className={`w-3.5 h-3.5 ${
                                sub.danger
                                  ? "text-rose-400"
                                  : sub.highlight
                                    ? "text-amber-400"
                                    : "text-slate-400"
                              }`}
                            />

                            <span className="truncate">
                              {sub.label}
                            </span>
                          </div>

                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                              sub.danger
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-slate-800/80 text-slate-400"
                            }`}
                          >
                            {sub.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {/* Footer */}

      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Focus Streak
              </span>

              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                Level 4
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-2">
              8 consecutive productive days logged
            </p>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

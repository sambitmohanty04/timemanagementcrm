import type { Dispatch, SetStateAction } from "react";
import { Sparkles, X } from "lucide-react";

import { NAV_ITEMS } from "../../data/navigation";

interface MobileSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  activeTaskFilter: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setActiveTaskFilter: Dispatch<SetStateAction<string>>;
}

export default function MobileSidebar({
  open,
  setOpen,
  activeTab,
  activeTaskFilter,
  setActiveTab,
  setActiveTaskFilter,
}: MobileSidebarProps) {
  if (!open) return null;

  const handleNavClick = (
    id: string,
    filter?: string
  ) => {
    setActiveTab(id);

    if (filter) {
      setActiveTaskFilter(filter);
    }

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}

      <div className="relative w-[280px] max-w-[80vw] bg-[#0F1523] h-full flex flex-col border-r border-slate-800 shadow-2xl z-10">
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <span className="font-bold text-white text-base">
              Chronos CRM
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300">
                      {item.badge}
                    </span>
                  )}
                </button>

                {item.subItems && isActive && (
                  <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 my-1">
                    {item.subItems.map((sub) => (
                      <button
                        type="button"
                        key={sub.id}
                        onClick={() =>
                          handleNavClick(
                            "tasks",
                            sub.filter
                          )
                        }
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${
                          activeTaskFilter === sub.filter
                            ? "text-indigo-400 font-semibold bg-indigo-500/10"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>{sub.label}</span>

                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
                          {sub.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Target } from "lucide-react";

interface FocusTaskSelectorProps {
  task: string;
  project: string;
  onTaskChange: (value: string) => void;
  onProjectChange: (value: string) => void;
}

const FocusTaskSelector = ({
  task,
  project,
  onTaskChange,
  onProjectChange,
}: FocusTaskSelectorProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500/10 p-2">
          <Target className="h-5 w-5 text-indigo-400" />
        </div>

        <div>
          <h3 className="font-medium text-white">
            What are you focusing on?
          </h3>

          <p className="text-xs text-slate-500">
            Connect this session to a task and project.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <select
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
        >
          <option value="" className="bg-slate-900 text-slate-400">
            Select task
          </option>

          <option
            value="Build Projects section"
            className="bg-slate-900 text-white"
          >
            Build Projects section
          </option>

          <option
            value="Create Calendar"
            className="bg-slate-900 text-white"
          >
            Create Calendar
          </option>

          <option
            value="API Integration"
            className="bg-slate-900 text-white"
          >
            API Integration
          </option>

          <option
            value="UI Design"
            className="bg-slate-900 text-white"
          >
            UI Design
          </option>
        </select>

        <select
          value={project}
          onChange={(e) => onProjectChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
        >
          <option
            value=""
            className="bg-slate-900 text-slate-400"
          >
            Select project
          </option>

          <option
            value="Chronos CRM"
            className="bg-slate-900 text-white"
          >
            Chronos CRM
          </option>

          <option
            value="Cellexa Website"
            className="bg-slate-900 text-white"
          >
            Cellexa Website
          </option>

          <option
            value="Personal"
            className="bg-slate-900 text-white"
          >
            Personal
          </option>
        </select>
      </div>
    </div>
  );
}

export default FocusTaskSelector;
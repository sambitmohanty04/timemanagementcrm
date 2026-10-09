import { useEffect, useState } from 'react';
// TODO: import the same axios instance your other pages use (with baseURL + auth header), e.g.
// import api from '../../services/api';
import axios from 'axios';

const api = axios; // replace with your configured instance

interface GoalOption {
  _id: string;
  title: string;
  status: string;
}

interface GoalSelectProps {
  value?: string;
  onChange: (goalId: string | undefined) => void;
  id?: string;
  className?: string;
}

type LoadState = 'loading' | 'ready' | 'error';

const GoalSelect = ({ value, onChange, id, className }: GoalSelectProps) => {
  const [goals, setGoals] = useState<GoalOption[]>([]);
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;

    api
      .get('/api/goals') // if your instance has baseURL ending in /api, use '/goals'
      .then((res) => {
        if (cancelled) return;
        const list = res.data?.data;
        if (Array.isArray(list)) {
          setGoals(list);
          setState('ready');
        } else {
          console.error('Unexpected goals response', res.data);
          setState('error');
        }
      })
      .catch((err) => {
        console.error('Failed to load goals', err);
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const options = goals.filter((g) => g.status !== 'completed' || g._id === value);

  const noGoalLabel =
    state === 'loading'
      ? 'Loading goals…'
      : state === 'error'
      ? "Couldn't load goals"
      : options.length === 0
      ? 'No goals yet'
      : 'No goal';

  return (
    <select
      id={id}
      value={value ?? ''}
      disabled={state !== 'ready'}
      onChange={(e) => onChange(e.target.value || undefined)}
      className={
        className ??
        'w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white'
      }
    >
      <option value="" className="bg-slate-800 text-gray-100">
        {noGoalLabel}
      </option>
      {options.map((g) => (
        <option key={g._id} value={g._id} className="bg-slate-800 text-gray-100">
          {g.title}
        </option>
      ))}
    </select>
  );
};

export default GoalSelect;
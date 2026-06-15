import { GraduationCap, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Topbar() {
  const { user } = useAuth();
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white">
          <GraduationCap size={20} />
        </div>
        <span className="font-bold text-slate-950">StudyFlow</span>
      </div>
      <div className="hidden h-10 w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 md:flex">
        <Search size={16} />
        Search flows and nodes
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-950">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">
          {user?.name?.slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

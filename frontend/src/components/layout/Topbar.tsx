import { GraduationCap, Search } from 'lucide-react';

export function Topbar() {
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
    </header>
  );
}

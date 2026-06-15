import { UserCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export function SettingsPage() {
  const { user } = useAuth();
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-950">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Profile details and future preferences.</p>
      </div>
      <Card className="max-w-2xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
            <UserCircle />
          </div>
          <div>
            <h2 className="font-semibold text-slate-950">Profile</h2>
            <p className="text-sm text-slate-500">Account information for this workspace.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={user?.name ?? ''} readOnly />
          <Input label="Email" value={user?.email ?? ''} readOnly />
        </div>
      </Card>
    </main>
  );
}

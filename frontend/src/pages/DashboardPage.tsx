import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, FilePlus2, FolderOpen, GraduationCap, MoreVertical, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useMindmaps } from '../hooks/useMindmaps';

const schema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

export function DashboardPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: studyMaps = [], isLoading, createMindmap, deleteMindmap } = useMindmaps();
  const { register, handleSubmit, reset, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const map = await createMindmap.mutateAsync(data);
    reset();
    setModalOpen(false);
    navigate(`/mindmaps/${map.id}`);
  }

  const totalNodes = studyMaps.reduce((sum, map) => sum + (map._count?.nodes ?? 0), 0);

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Create, review, and open your study flows.</p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setModalOpen(true)}>Create Study Flow</Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total Study Flows', value: studyMaps.length, icon: GraduationCap, tone: 'text-indigo-600 bg-indigo-50' },
          { label: 'Recent Flows', value: Math.min(studyMaps.length, 5), icon: Clock, tone: 'text-cyan-600 bg-cyan-50' },
          { label: 'AI Generations', value: totalNodes, icon: Sparkles, tone: 'text-emerald-600 bg-emerald-50' },
        ].map((item) => (
          <Card key={item.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{item.value}</p>
              </div>
              <div className={`grid h-11 w-11 place-items-center rounded-lg ${item.tone}`}>
                <item.icon size={22} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-40 animate-pulse bg-white p-5">
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="mt-4 h-3 w-full rounded bg-slate-100" />
              <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
            </Card>
          ))}
        </div>
      ) : studyMaps.length === 0 ? (
        <EmptyState
          icon={<FilePlus2 />}
          title="No study flows yet"
          description="Create your first flow, then add nodes, generate AI ideas, and export the result."
          action={<Button icon={<Plus size={18} />} onClick={() => setModalOpen(true)}>Create Study Flow</Button>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {studyMaps.map((map) => (
            <Card key={map.id} className="p-5 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="line-clamp-1 font-semibold text-slate-950">{map.title}</h2>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">{map.description || 'No description added yet.'}</p>
                </div>
                <MoreVertical size={18} className="text-slate-400" />
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>{map._count?.nodes ?? 0} nodes</span>
                <span>{new Date(map.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-5 flex gap-2">
                <Link className="flex-1" to={`/mindmaps/${map.id}`}>
                  <Button className="w-full" variant="secondary" icon={<FolderOpen size={16} />}>Open</Button>
                </Link>
                <Button
                  variant="ghost"
                  icon={<Trash2 size={16} />}
                  aria-label={`Delete ${map.title}`}
                  onClick={() => deleteMindmap.mutate(map.id)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <section className="mt-6">
        <Card className="p-5">
          <h2 className="font-semibold text-slate-950">Recent activity</h2>
          <p className="mt-2 text-sm text-slate-500">Activity history, shared flows, and study events will appear here in the next iteration.</p>
        </Card>
      </section>

      <Modal open={modalOpen} title="Create Study Flow" onClose={() => setModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register('title')} error={formState.errors.title?.message} />
          <Textarea label="Description" {...register('description')} error={formState.errors.description?.message} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button disabled={createMindmap.isPending}>{createMindmap.isPending ? 'Creating...' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

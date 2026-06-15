import { Sparkles, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MindMapNode, NodeType, UpdateNodeInput } from '../../types/node';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { Input, Textarea } from '../ui/Input';

const nodeTypes: NodeType[] = ['TOPIC', 'SUBTOPIC', 'TASK', 'RESOURCE', 'NOTE'];

type FormData = {
  label: string;
  description: string;
  type: NodeType;
  color: string;
};

export function NodeInspector({
  node,
  onUpdate,
  onDelete,
  onExpand,
}: {
  node: MindMapNode | null;
  onUpdate: (input: UpdateNodeInput) => void;
  onDelete: () => void;
  onExpand: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (node) {
      reset({
        label: node.label,
        description: node.description ?? '',
        type: node.type,
        color: node.color ?? '#6366f1',
      });
    }
  }, [node, reset]);

  if (!node) {
    return (
      <aside className="w-full border-t border-slate-200 bg-white p-4 lg:w-80 lg:border-l lg:border-t-0">
        <EmptyState icon={<Sparkles />} title="Select a step" description="Details, edits, and AI expansion controls will appear here." />
      </aside>
    );
  }

  return (
    <aside className="w-full border-t border-slate-200 bg-white p-4 lg:w-80 lg:border-l lg:border-t-0">
      <div className="mb-4">
        <h2 className="font-semibold text-slate-950">Study Step</h2>
        <p className="text-sm text-slate-500">Edit the selected item and save changes.</p>
      </div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => {
          onUpdate(data);
        })}
      >
        <Input label="Label" {...register('label')} />
        <Textarea label="Description" {...register('description')} />
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Type</span>
          <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" {...register('type')}>
            {nodeTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <Input label="Color" type="color" className="p-1" {...register('color')} />
        <Button className="w-full">Save Changes</Button>
      </form>
      <div className="mt-4 grid gap-2">
        <Button variant="secondary" icon={<Sparkles size={17} />} onClick={onExpand}>AI Expand Step</Button>
        <Button variant="danger" icon={<Trash2 size={17} />} onClick={onDelete}>Delete Step</Button>
      </div>
    </aside>
  );
}

import { Handle, NodeProps, Position } from '@xyflow/react';
import { BookOpen, CheckSquare, FileText, Lightbulb, StickyNote } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { MindMapFlowNode } from '../../utils/nodeMapper';

const icons = {
  TOPIC: Lightbulb,
  SUBTOPIC: BookOpen,
  TASK: CheckSquare,
  RESOURCE: FileText,
  NOTE: StickyNote,
};

export function CustomMindMapNode({ data }: NodeProps<MindMapFlowNode>) {
  const Icon = icons[data.type];
  return (
    <div className="mindai-node w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-md transition">
      <Handle type="target" position={Position.Left} className="!bg-indigo-500" />
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: data.color ?? '#6366f1' }}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">{data.label}</p>
          <Badge className="mt-1">{data.type}</Badge>
        </div>
      </div>
      {data.description ? <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{data.description}</p> : null}
      <Handle type="source" position={Position.Right} className="!bg-indigo-500" />
    </div>
  );
}

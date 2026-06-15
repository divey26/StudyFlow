import { Download, FileJson, LayoutDashboard, Plus, Sparkles } from 'lucide-react';
import { MindMap } from '../../types/mindmap';
import { NodeType } from '../../types/node';
import { Button } from '../ui/Button';

const types: NodeType[] = ['TOPIC', 'SUBTOPIC', 'TASK', 'RESOURCE', 'NOTE'];

export function EditorSidebar({
  mindMap,
  activeType,
  onTypeChange,
  onAddNode,
  onGenerate,
  onExportJson,
  onExportPng,
  onAutoLayout,
}: {
  mindMap: MindMap;
  activeType: NodeType | 'ALL';
  onTypeChange: (type: NodeType | 'ALL') => void;
  onAddNode: () => void;
  onGenerate: () => void;
  onExportJson: () => void;
  onExportPng: () => void;
  onAutoLayout: () => void;
}) {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:w-72 lg:border-b-0 lg:border-r">
      <h1 className="text-lg font-bold text-slate-950">{mindMap.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{mindMap.description || 'No study notes yet.'}</p>

      <div className="mt-5 grid gap-2">
        <Button icon={<Plus size={17} />} onClick={onAddNode}>Add Node</Button>

        <Button variant="secondary" icon={<Sparkles size={17} />} onClick={onGenerate}>
          Generate Flow
        </Button>

        <Button variant="secondary" icon={<LayoutDashboard size={17} />} onClick={onAutoLayout}>
          Auto Layout
        </Button>
      </div>

      {/* Export section */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Export</p>
        <div className="grid gap-2">
          <Button variant="secondary" icon={<Download size={17} />} onClick={onExportPng}>
            Save PNG
          </Button>
          <Button variant="ghost" icon={<FileJson size={17} />} onClick={onExportJson}>
            Save JSON
          </Button>
        </div>
      </div>

      {/* Node type filters */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Node filters</p>
        <div className="flex flex-wrap gap-2">
          {(['ALL', ...types] as const).map((type) => (
            <button
              key={type}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                activeType === type
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
              onClick={() => onTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

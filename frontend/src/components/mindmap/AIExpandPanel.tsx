import { ExpandSuggestion } from '../../types/mindmap';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function AIExpandPanel({
  suggestions,
  onAdd,
  onClose,
}: {
  suggestions: ExpandSuggestion[];
  onAdd: (suggestions: ExpandSuggestion[]) => void;
  onClose: () => void;
}) {
  if (suggestions.length === 0) return null;
  return (
    <div className="absolute bottom-4 left-4 z-10 w-[min(420px,calc(100%-2rem))] rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">AI Suggestions</h3>
          <p className="text-sm text-slate-500">Add these as child nodes.</p>
        </div>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-950" onClick={onClose}>Close</button>
      </div>
      <div className="space-y-2">
        {suggestions.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">{item.label}</p>
              <Badge>{item.type}</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
      <Button className="mt-3 w-full" onClick={() => onAdd(suggestions)}>Add Suggestions</Button>
    </div>
  );
}

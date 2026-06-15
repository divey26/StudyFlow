import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Link2, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { GeneratedMindMap } from '../../types/mindmap';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input, Textarea } from '../ui/Input';
import { Modal } from '../ui/Modal';

// Tab: Generate from topic
const topicSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters'),
  context: z.string().optional(),
});
type TopicForm = z.infer<typeof topicSchema>;

// Tab: Ingest URL or text
const ingestSchema = z
  .object({
    url: z.string().optional(),
    text: z.string().optional(),
  })
  .refine((v) => (v.url && v.url.length > 5) || (v.text && v.text.length >= 20), {
    message: 'Provide a URL or at least 20 characters of text.',
    path: ['url'],
  });
type IngestForm = z.infer<typeof ingestSchema>;

type Tab = 'generate' | 'ingest';

const NODE_TYPE_COLORS: Record<string, string> = {
  TOPIC: 'bg-indigo-100 text-indigo-700',
  SUBTOPIC: 'bg-emerald-100 text-emerald-700',
  TASK: 'bg-amber-100 text-amber-700',
  RESOURCE: 'bg-cyan-100 text-cyan-700',
  NOTE: 'bg-slate-100 text-slate-600',
};

export function AIGenerateModal({
  open,
  loading,
  onClose,
  onGenerate,
  onIngest,
  onInsert,
}: {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onGenerate: (input: TopicForm) => Promise<GeneratedMindMap>;
  onIngest: (input: { url?: string; text?: string }) => Promise<GeneratedMindMap>;
  onInsert: (map: GeneratedMindMap) => Promise<void>;
}) {
  const [tab, setTab] = useState<Tab>('generate');
  const [preview, setPreview] = useState<GeneratedMindMap | null>(null);
  const [ingestLoading, setIngestLoading] = useState(false);

  const topicForm = useForm<TopicForm>({ resolver: zodResolver(topicSchema) });
  const ingestForm = useForm<IngestForm>({ resolver: zodResolver(ingestSchema) });

  async function submitTopic(data: TopicForm) {
    setPreview(null);
    const map = await onGenerate(data);
    setPreview(map);
  }

  async function submitIngest(data: IngestForm) {
    setPreview(null);
    setIngestLoading(true);
    try {
      const map = await onIngest({ url: data.url, text: data.text });
      setPreview(map);
    } finally {
      setIngestLoading(false);
    }
  }

  function handleClose() {
    setPreview(null);
    topicForm.reset();
    ingestForm.reset();
    onClose();
  }

  const isLoading = loading || ingestLoading;

  return (
    <Modal open={open} title="AI Study Flow Generator" onClose={handleClose}>
      {/* Tab switcher */}
      <div className="mb-5 flex rounded-lg border border-slate-200 bg-slate-50 p-1">
        <button
          type="button"
          onClick={() => { setTab('generate'); setPreview(null); }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition ${
            tab === 'generate' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sparkles size={15} />
          From Topic
        </button>
        <button
          type="button"
          onClick={() => { setTab('ingest'); setPreview(null); }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition ${
            tab === 'ingest' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Link2 size={15} />
          From URL / Text
        </button>
      </div>

      {/* Generate tab */}
      {tab === 'generate' && (
        <form className="space-y-4" onSubmit={topicForm.handleSubmit(submitTopic)}>
          <Input
            label="Topic"
            placeholder="e.g. Full Stack Developer Roadmap"
            {...topicForm.register('topic')}
            error={topicForm.formState.errors.topic?.message}
          />
          <Textarea
            label="Context (optional)"
            placeholder="e.g. For a junior dev with 6 months experience"
            {...topicForm.register('context')}
          />
          <Button disabled={isLoading} icon={isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}>
            {isLoading ? 'Generating...' : 'Generate with AI'}
          </Button>
        </form>
      )}

      {/* Ingest tab */}
      {tab === 'ingest' && (
        <form className="space-y-4" onSubmit={ingestForm.handleSubmit(submitIngest)}>
          <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm text-indigo-700">
            <strong>Paste a URL</strong> (webpage or YouTube video) or <strong>raw text</strong> and AI will extract the key ideas into a study flow.
          </div>
          <Input
            label="URL"
            placeholder="https://... or https://youtube.com/watch?v=..."
            {...ingestForm.register('url')}
            error={ingestForm.formState.errors.url?.message}
          />
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="flex items-center gap-1"><FileText size={12} /> or paste text below</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <Textarea
            label="Raw Text"
            placeholder="Paste article, notes, or any content here (min 20 characters)..."
            rows={5}
            {...ingestForm.register('text')}
          />
          <Button disabled={isLoading} icon={isLoading ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}>
            {isLoading ? 'Processing...' : 'Extract & Build Map'}
          </Button>
        </form>
      )}

      {/* Preview */}
      {preview && (
        <>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Preview - {preview.nodes.length} nodes generated
            </p>
            <div className="max-h-64 overflow-auto space-y-1">
              {preview.nodes.map((node) => (
                <div
                  key={`${node.label}-${node.parentLabel}`}
                  className="flex items-start gap-3 rounded-md border border-slate-100 bg-white px-3 py-2"
                >
                  <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${NODE_TYPE_COLORS[node.type] ?? 'bg-slate-100 text-slate-600'}`}>
                    {node.type}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{node.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{node.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setPreview(null)}>Discard</Button>
            <Button onClick={() => onInsert(preview)} icon={<Sparkles size={15} />}>
              Insert {preview.nodes.length} Nodes
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

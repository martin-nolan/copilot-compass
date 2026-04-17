import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Decision } from "@/hooks/useDecisions";

type Props = {
  onSave: (d: Omit<Decision, "id" | "createdAt">) => void;
  onCancel?: () => void;
};

const paths = ["M365 Copilot", "Copilot Studio", "React App", "Hybrid"];

export function DecisionForm({ onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    ideaName: "",
    chosenPath: "M365 Copilot",
    why: "",
    pocNotes: "",
    productionNotes: "",
    reactNotes: "",
    nextSteps: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ideaName.trim()) return;
    onSave(form);
    setForm({
      ideaName: "",
      chosenPath: "M365 Copilot",
      why: "",
      pocNotes: "",
      productionNotes: "",
      reactNotes: "",
      nextSteps: "",
    });
  };

  return (
    <form
      onSubmit={submit}
      className="premium-card p-6 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Idea name">
          <Input
            value={form.ideaName}
            onChange={(e) => set("ideaName", e.target.value)}
            placeholder="e.g. Onboarding training assistant"
            className="bg-input/50 border-border"
          />
        </Field>
        <Field label="Chosen path">
          <Select value={form.chosenPath} onValueChange={(v) => set("chosenPath", v)}>
            <SelectTrigger className="bg-input/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {paths.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Why this path">
        <Textarea
          rows={2}
          value={form.why}
          onChange={(e) => set("why", e.target.value)}
          placeholder="The reasoning that made this feel right."
          className="bg-input/50 border-border resize-none"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="PoC notes">
          <Textarea
            rows={3}
            value={form.pocNotes}
            onChange={(e) => set("pocNotes", e.target.value)}
            className="bg-input/50 border-border resize-none"
          />
        </Field>
        <Field label="Production notes">
          <Textarea
            rows={3}
            value={form.productionNotes}
            onChange={(e) => set("productionNotes", e.target.value)}
            className="bg-input/50 border-border resize-none"
          />
        </Field>
        <Field label="React app notes">
          <Textarea
            rows={3}
            value={form.reactNotes}
            onChange={(e) => set("reactNotes", e.target.value)}
            className="bg-input/50 border-border resize-none"
          />
        </Field>
      </div>

      <Field label="Next steps">
        <Textarea
          rows={2}
          value={form.nextSteps}
          onChange={(e) => set("nextSteps", e.target.value)}
          placeholder="The smallest next thing that moves this forward."
          className="bg-input/50 border-border resize-none"
        />
      </Field>

      <div className="flex items-center justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="bg-amber text-amber-foreground hover:bg-amber/90"
        >
          Save decision
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="editorial-eyebrow mb-1.5">{label}</div>
      {children}
    </label>
  );
}

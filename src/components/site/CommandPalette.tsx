import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { paths } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const go = (to: string, hash?: string) => {
    setOpen(false);
    void navigate({ to, hash });
  };

  const routeShortcuts = useMemo(
    () => [
      { label: "Open walkthrough", to: "/walkthrough" },
      { label: "Open saved", to: "/saved" },
      { label: "Open decisions", to: "/decisions" },
      { label: "Open changelog", to: "/changelog" },
    ],
    [],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search paths, modules, tradeoffs, and routes..." />
      <CommandList>
        <CommandEmpty>No matching route, module, or tradeoff.</CommandEmpty>

        <CommandGroup heading="Paths">
          {paths.map((path) => (
            <CommandItem
              key={path.id}
              onSelect={() => go("/choose-path", path.id)}
              value={`${path.name} ${path.shortName}`}
            >
              <span>{path.name}</span>
              <CommandShortcut>{path.number}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Learn">
          {learnModules.map((module) => (
            <CommandItem
              key={module.id}
              onSelect={() => go("/learn", module.id)}
              value={`${module.title} ${module.chapter}`}
            >
              <span>{module.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Tradeoffs">
          {comparisons.map((comparison) => (
            <CommandItem
              key={comparison.id}
              onSelect={() => go("/choose-path", comparison.id)}
              value={comparison.title}
            >
              <span>{comparison.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Use Cases">
          {useCases.map((useCase) => (
            <CommandItem key={useCase.id} onSelect={() => go("/use-cases")} value={useCase.title}>
              <span>{useCase.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Routes">
          {routeShortcuts.map((shortcut) => (
            <CommandItem key={shortcut.to} onSelect={() => go(shortcut.to)} value={shortcut.label}>
              <span>{shortcut.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

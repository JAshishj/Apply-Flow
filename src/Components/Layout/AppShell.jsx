import { NavLink } from "react-router-dom";
import { HardDrive, Kanban, SquaresFour } from "@phosphor-icons/react";
import { cn } from "../../lib/cn";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";

const NAV = [
  { to: "/", label: "Overview", icon: SquaresFour, end: true },
  { to: "/Applications", label: "Applications", icon: Kanban },
];

function SidebarLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "relative flex h-10 items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] font-medium transition-colors duration-150",
          isActive
            ? "bg-panel text-ink shadow-[0_1px_2px_rgba(21,24,18,0.06)]"
            : "text-muted hover:bg-panel/60 hover:text-ink",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 left-0 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-opacity duration-150",
              isActive ? "opacity-100" : "opacity-0",
            )}
          />
          <Icon size={18} weight={isActive ? "fill" : "regular"} />
          {label}
        </>
      )}
    </NavLink>
  );
}

function TabLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-150",
          isActive ? "text-ink" : "text-faint",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} weight={isActive ? "fill" : "regular"} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function AppShell({ children }) {
  return (
    <div className="min-h-[100dvh] bg-canvas">
      <a
        href="#main"
        className="sr-only rounded-[10px] bg-panel px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70]"
      >
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-line bg-panel-2 px-4 py-6 lg:flex">
        <div className="px-2">
          <Wordmark />
        </div>

        <nav aria-label="Primary" className="mt-9">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <SidebarLink {...item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-line pt-4">
          <ThemeToggle variant="full" />
          <p className="mt-1 flex items-center gap-2 px-2.5 text-[11.5px] text-muted">
            <HardDrive size={14} />
            Saved on this device
          </p>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-canvas/85 px-4 backdrop-blur-md lg:hidden">
          <Wordmark />
          <ThemeToggle />
        </header>

        <main
          id="main"
          className="mx-auto w-full max-w-[1180px] px-4 pt-7 pb-28 sm:px-6 lg:px-10 lg:pt-12 lg:pb-16"
        >
          {children}
        </main>
      </div>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-2">
          {NAV.map((item) => (
            <li key={item.to}>
              <TabLink {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

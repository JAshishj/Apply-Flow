import { cn } from "./cn";

const inputBase =
  "w-full rounded-[10px] border border-line bg-panel px-3 text-sm text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-faint hover:border-line-strong focus:border-accent focus:ring-[3px] focus:ring-accent-soft";

export const inputClass = cn(inputBase, "h-10");

export const textareaClass = cn(
  inputBase,
  "min-h-[84px] resize-y py-2.5 leading-relaxed",
);

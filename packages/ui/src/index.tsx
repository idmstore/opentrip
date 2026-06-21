import type { ButtonHTMLAttributes, ReactNode } from 'react';
export function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) { return <button className="rounded bg-emerald-600 px-4 py-2 font-medium text-white" {...props}>{children}</button>; }

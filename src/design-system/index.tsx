import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { cn } from './theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {leftIcon ? <span className="inline-flex items-center">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="inline-flex items-center">{rightIcon}</span> : null}
    </button>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 dark:border-slate-800 dark:bg-slate-900',
        hoverable && 'hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
  };

  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, description, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3> : null}
            {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>

        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  );
}

export interface DialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Dialog({ trigger, title, description, children, footer }: DialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Modal open={open} onClose={() => setOpen(false)} title={title} description={description} footer={footer}>
        {children}
      </Modal>
    </>
  );
}

export interface TabsItem {
  label: string;
  value: string;
}

export interface TabsProps {
  items: TabsItem[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ items, value, onChange }: TabsProps) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            'rounded-lg px-3 py-2 text-sm font-medium transition',
            value === item.value
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value, max = 100, size = 'md', className, ...props }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800', sizeClasses[size], className)} {...props}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-slate-700">
        {label}
      </span>
    </div>
  );
}

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Dropdown({ label, items, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? items[0]?.value ?? '');

  const menu = useMemo(() => items, [items]);
  const selectedLabel = menu.find((item) => item.value === selected)?.label ?? label;

  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex min-w-[180px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <span>{selectedLabel}</span>
        <span aria-hidden="true">▾</span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950">
          {menu.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setSelected(item.value);
                onChange?.(item.value);
                setOpen(false);
              }}
              className={cn(
                'block w-full px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800',
                selected === item.value && 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50',
        className,
      )}
      {...props}
    />
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50',
        className,
      )}
      {...props}
    />
  );
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: Array<{ label: string; value: string }>;
  onChange?: (value: string) => void;
}

export function Select({ options, className, onChange, value, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50',
        className,
      )}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export interface ToastProps {
  message: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Toast({ message, variant = 'default' }: ToastProps) {
  const variants = {
    default: 'bg-slate-900 text-white dark:bg-slate-700',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-slate-900',
    danger: 'bg-red-600 text-white',
  };

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm shadow-lg', variants[variant])}>
      <span className="inline-block h-2 w-2 rounded-full bg-current opacity-80" />
      {message}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <span className={cn('inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400', className)} />;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function Skeleton({ lines = 3, className, ...props }: SkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"
          style={{ width: index === lines - 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg dark:bg-slate-800">○</div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export function ErrorState({ title = 'Something went wrong', message = 'Please try again or check your connection.', action }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export { cn };

export const designTokens = {
  colors: {
    bg: 'var(--ds-bg)',
    surface: 'var(--ds-surface)',
    surfaceAlt: 'var(--ds-surface-alt)',
    border: 'var(--ds-border)',
    text: 'var(--ds-text)',
    textMuted: 'var(--ds-text-muted)',
    primary: 'var(--ds-primary)',
    primarySoft: 'var(--ds-primary-soft)',
    success: 'var(--ds-success)',
    warning: 'var(--ds-warning)',
    danger: 'var(--ds-danger)',
    info: 'var(--ds-info)',
    shadow: 'var(--ds-shadow)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  typography: {
    h1: 'clamp(2.5rem, 5vw, 4.5rem)',
    h2: 'clamp(2rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2.25rem)',
    body: '1rem',
    small: '0.875rem',
    tiny: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
    md: '0 8px 20px -8px rgb(15 23 42 / 0.18)',
    lg: '0 20px 45px -20px rgb(15 23 42 / 0.28)',
  },
} as const;

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

// globals.d.ts
import 'react';

declare module 'react' {
  interface CSSProperties {
    // Telegram Mini App variables
    '--tg-viewport-height'?: string;
    '--tg-bg-color'?: string;
    '--tg-text-color'?: string;
    
    // Ваши кастомные переменные
    '--background'?: string;
    '--foreground'?: string;
    '--card'?: string;
    '--card-foreground'?: string;
    '--primary'?: string;
    '--primary-foreground'?: string;
    '--secondary'?: string;
    '--secondary-foreground'?: string;
    '--muted'?: string;
    '--muted-foreground'?: string;
    '--accent'?: string;
    '--accent-foreground'?: string;
    '--destructive'?: string;
    '--destructive-foreground'?: string;
    '--border'?: string;
    '--input'?: string;
    '--ring'?: string;
    '--radius'?: string;
    '--sidebar-background'?: string;
    '--sidebar-foreground'?: string;
    '--sidebar-primary'?: string;
    '--sidebar-primary-foreground'?: string;
    '--sidebar-accent'?: string;
    '--sidebar-accent-foreground'?: string;
    '--sidebar-border'?: string;
    '--sidebar-ring'?: string;
    '--f1-red'?: string;
    '--f1-orange'?: string;
  }
}
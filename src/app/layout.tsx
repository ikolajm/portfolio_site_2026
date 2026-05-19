import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SiteHeader } from '@/components/atoms/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jacob Ikola — Design. Development. And the systems between.',
  description:
    'Design Engineer building design systems and developer tools. Case studies: JAMIE, Loom, Paperboy, Party Wipe.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Finlandica:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Checkmate Media — News & OTT Platform',
  description: 'Production-grade Hybrid News + Video Platform for Checkmate Media.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/checkmate-logo.jpg',
    apple: '/checkmate-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('checkmate_theme_mode') || 'auto';
                  var root = document.documentElement;
                  if (mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-dark text-brand-text transition-colors duration-200">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

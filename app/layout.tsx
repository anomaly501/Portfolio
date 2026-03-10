import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Matrix — Choose Your Reality',
  description: 'A cinematic portfolio. Red pill or blue pill? The choice is yours.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

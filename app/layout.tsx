import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr. Serena Blake, PsyD - Licensed Clinical Psychologist in Los Angeles',
  description: 'Professional therapy support for anxiety, relationships, and trauma recovery. Dr. Serena Blake offers both in-person and virtual sessions in Los Angeles, CA.',
  keywords: 'therapist, psychologist, Los Angeles, anxiety therapy, relationship counseling, trauma recovery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
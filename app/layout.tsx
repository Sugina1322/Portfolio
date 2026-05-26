import type { Metadata } from 'next';
import '../src/tailwind.css';
import '../src/styles.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jeancristian.dev';
const siteDescription =
  'Cyber-noir portfolio for Jean Cristian Mangaser, focused on SAP security administration, ABAP fundamentals, cybersecurity, and dependable product development.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Jean Cristian Mangaser | SAP Security & Software Developer',
  description: siteDescription,
  applicationName: 'Jean Cristian Mangaser Portfolio',
  authors: [{ name: 'Jean Cristian Mangaser' }],
  creator: 'Jean Cristian Mangaser',
  keywords: [
    'Jean Cristian Mangaser',
    'SAP Security Administrator',
    'ABAP',
    'Cybersecurity',
    'Software Developer',
    'React Native',
    'Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'Jean Cristian Mangaser | SAP Security & Software Developer',
    description: siteDescription,
    url: '/',
    siteName: 'Jean Cristian Mangaser Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Jean Cristian Mangaser cyber-noir portfolio preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jean Cristian Mangaser | SAP Security & Software Developer',
    description: siteDescription,
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

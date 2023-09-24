import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Infusor',
  description: 'Infuse your NFT to be cool & sustainable-proof',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

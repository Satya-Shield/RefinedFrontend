import "./globals.css";
import Page from './page'
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
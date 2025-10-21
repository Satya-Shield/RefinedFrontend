import "./globals.css";
import Page from './page'
import AuthProvider from "@/components/AuthProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
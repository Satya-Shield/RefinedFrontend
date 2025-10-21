import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar"; // adjust path as needed
import "./globals.css";

export const metadata = {
  title: "Your App",
  description: "Your description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
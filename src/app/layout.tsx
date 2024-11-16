import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Last Stop Flight Booking",
  description: "Enjoy the best flight booking experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}

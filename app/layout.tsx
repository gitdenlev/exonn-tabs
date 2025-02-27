import { Poppins } from "next/font/google"; // Імпортуємо Poppins
import "./globals.css";

const poppins = Poppins({
  weight: "400", // Можна вказати потрібні ваги
  subsets: ["latin"],
  variable: "--font-poppins", // Додаємо змінну для шрифта
});

export const metadata = {
  title: "Exonn Tabs",
  description: "Tabs component for Exonn",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}

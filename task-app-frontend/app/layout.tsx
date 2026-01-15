import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager - Gestión Inteligente de Tareas",
  description:
    "Aplicación de gestión de tareas con IA para resúmenes, prioridades y autocompletado inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}

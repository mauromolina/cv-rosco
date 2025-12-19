import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rosco - Iglesia Cristo Viviente",
  description:
    "Juega al rosco de preguntas bíblicas estilo Pasapalabra. 4 roscos temáticos con 26 preguntas cada uno.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CV</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Rosco Bíblico</h1>
              </div>
              <a
                href="/"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </header> */}
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}

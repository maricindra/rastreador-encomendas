import AppHeader from "@/components/AppHeader";
import AppProviders from "@/app/providers";

export const metadata = {
  title: "Rastreador de Encomendas",
  description: "Acompanhe o status das suas encomendas com Next.js",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>
          <AppHeader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

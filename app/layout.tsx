import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatOverlay from "./components/ChatOverlay";

export const metadata = {
  title: {
    default: "My Company",
    template: "%s | My Company",
  },
  description: "Official website of My Company",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <ChatOverlay />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

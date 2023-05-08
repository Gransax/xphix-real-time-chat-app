import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Inter, Nunito } from "next/font/google";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Real-time chat application",
  description: "An awesome real*time chat application in nextJs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}

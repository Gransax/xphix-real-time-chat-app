import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Nunito } from "next/font/google";

const mainFont = Nunito({ subsets: ["latin"] });

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
      <body className={mainFont.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}

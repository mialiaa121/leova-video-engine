import "./globals.css";

export const metadata = {
  title: "LEOVA VIDEO ENGINE",
  description: "AI video engine for cloning, timelapse, and affiliate video."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

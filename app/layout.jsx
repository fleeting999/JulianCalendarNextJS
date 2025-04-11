import '../styles/globals.css';

export const metadata = {
  title: "Julian Calendar",
  description: "Responsive Julian date tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

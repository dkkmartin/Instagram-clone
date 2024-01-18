import './globals.css';

export const metadata = {
  title: 'Instagram clone',
  description: 'Instagram clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

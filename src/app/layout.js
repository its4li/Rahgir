import './globals.css'

export const metadata = {
  title: 'رهگیر - ردیاب تراکنش‌های کریپتو',
  description: 'ردیابی تراکنش‌های کریپتو در شبکه‌های مختلف بلاک‌چین',
  keywords: 'کریپتو, بلاک‌چین, تراکنش, اتریوم, بیت‌کوین',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir">
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
          <header className="glass border-b border-white/20 p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                🔍 رهگیر - ردیاب تراکنش‌های کریپتو
              </h1>
              <p className="text-white/80 text-center mt-2">
                ردیابی تراکنش‌ها در شبکه‌های اتریوم، BSC، آربیتروم و اپتیمیزم
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

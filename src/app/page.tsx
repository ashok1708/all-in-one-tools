
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-16 lg:p-20 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-4">All-in-One Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl">
        <a href="/tools/password-generator" className="p-4 sm:p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Password Generator</h2>
          <p className="text-sm sm:text-base text-gray-600">Generate secure and customizable passwords</p>
        </a>

        <a href="/tools/scss-converter" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">SCSS to CSS Converter</h2>
          <p className="text-gray-600">Convert SCSS code to plain CSS format</p>
        </a>

        <a href="/tools/json-beautifier" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">JSON Formatter & Beautifier</h2>
          <p className="text-gray-600">Format and validate your JSON data with syntax highlighting</p>
        </a>

        <a href="/tools/base64" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Base64 Converter</h2>
          <p className="text-gray-600">Encode and decode Base64 strings easily</p>
        </a>

        <a href="/tools/url-codec" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">URL Encoder/Decoder</h2>
          <p className="text-gray-600">Convert URLs to encoded format and vice versa</p>
        </a>

        <a href="/tools/qr-generator" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">QR Code Generator</h2>
          <p className="text-gray-600">Generate QR codes for text, URLs, and more</p>
        </a>

       
      </div>

      <footer className="text-xs sm:text-sm text-gray-500 py-4">
       Created By <a href="https://github.com/ashok1708">Ashok Chouhan</a>
      </footer>
    </div>
  );
}

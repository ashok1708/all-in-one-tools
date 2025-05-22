import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const tools = [
  { name: 'SCSS to CSS', icon: '/file.svg', href: '/tools/scss-converter' },
  { name: 'Minifier', icon: '/file.svg', href: '/tools/minifier' },
  { name: 'JSON Beautifier', icon: '/file.svg', href: '/tools/json-beautifier' },
  { name: 'QR Code Generator', icon: '/globe.svg', href: '/tools/qr-generator' },
  { name: 'Base64 Converter', icon: '/file.svg', href: '/tools/base64' },
  { name: 'URL Encoder/Decoder', icon: '/globe.svg', href: '/tools/url-codec' },
  { name: 'Password Genetor', icon: '/window.svg', href: '/tools/password-generator' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`
        bg-gray-900 text-gray-100 h-screen overflow-y-auto border-r border-gray-800 shadow-lg
        fixed top-0 left-0 z-40 transition-transform duration-300
        ${isMobile ? 'w-full' : 'w-64'}
        ${isMobile && !isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 lg:w-64
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 text-white tracking-tight">All-in-One Tools</h1>
          <nav>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out group"
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={20}
                      height={20}
                      className="mr-4 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
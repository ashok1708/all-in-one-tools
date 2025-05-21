import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 text-white tracking-tight">All-in-One Tools</h1>
        <nav>
          <ul className="space-y-3">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out group"
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
  );
}
'use client';

import { useState } from 'react';

const generatePassword = (length: number, charset: string): string => {
  let result = '';
  const charsetLength = charset.length;
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength));
  }
  return result;
};

export default function PasswordGenerator() {
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [length, setLength] = useState(15);
  const [count, setCount] = useState(1);
  const [separator, setSeparator] = useState('');
  const [oneLine, setOneLine] = useState(false);
  const [output, setOutput] = useState('');

  const charset = [
    useLower ? 'abcdefghijklmnopqrstuvwxyz' : '',
    useUpper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    useDigits ? '0123456789' : '',
    useSymbols ? '!@#$%^&*()-_=+[]{}|;:,.<>/?' : '',
  ].join('');

  const handleGenerate = () => {
    if (!charset) {
      setOutput('Please select at least one character set.');
      return;
    }
    const passwords = Array.from({ length: count }, () =>
      generatePassword(length, charset)
    );
    setOutput(oneLine ? passwords.join(separator) : passwords.join('\n'));
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Password Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block"><input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> Use lowercase (a-z)</label>
            <label className="block"><input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Use uppercase (A-Z)</label>
            <label className="block"><input type="checkbox" checked={useDigits} onChange={e => setUseDigits(e.target.checked)} /> Use digits (0-9)</label>
            <label className="block"><input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> Use symbols</label>
          </div>

          <div className="space-y-2">
            <label className="block">Length of passwords</label>
            <input type="number" value={length} min={1} onChange={e => setLength(Number(e.target.value))} className="border p-1 w-full rounded" />
          </div>

          <div className="space-y-2">
            <label className="block">Number of passwords</label>
            <input type="number" value={count} min={1} onChange={e => setCount(Number(e.target.value))} className="border p-1 w-full rounded" />
          </div>

          <div className="space-y-2">
            <label className="block">Output format</label>
            <div className="flex gap-4">
              <button className={`px-3 py-1 border rounded ${!oneLine ? 'bg-gray-300' : ''}`} onClick={() => setOneLine(false)}>Separate lines</button>
              <button className={`px-3 py-1 border rounded ${oneLine ? 'bg-gray-300' : ''}`} onClick={() => setOneLine(true)}>One line</button>
            </div>
          </div>

          {oneLine && (
            <div className="space-y-2">
              <label className="block">Separator</label>
              <input type="text" value={separator} onChange={e => setSeparator(e.target.value)} className="border p-1 w-full rounded" />
            </div>
          )}

          <button onClick={handleGenerate} className="px-4 py-2 bg-green-600 text-white rounded">
            Generate
          </button>
        </div>

        <div className="space-y-4">
          <label className="block font-medium">Generated Passwords</label>
          <textarea value={output} readOnly className="w-full h-80 border rounded p-2 font-mono resize-none" />
          <div className="flex gap-2">
            <button onClick={() => setOutput('')} className="px-3 py-1 bg-gray-300 rounded">Clear</button>
            <button onClick={handleCopy} className="px-3 py-1 bg-blue-500 text-white rounded">Copy</button>
            <button onClick={handleDownload} className="px-3 py-1 bg-purple-600 text-white rounded">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

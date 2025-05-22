'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import { Editor } from '@monaco-editor/react';
import Image from 'next/image';

export default function QRGenerator() {
  const [input, setInput] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [error, setError] = useState('');

  const generateQRCode = async (value: string) => {
    try {
      setError('');
      if (!value.trim()) {
        setQRCode('');
        return;
      }

      const url = await QRCode.toDataURL(value);
      setQRCode(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setQRCode('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">QR Code Generator</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Text Input</label>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
          <div className="h-full border rounded-lg overflow-hidden">
            <Editor
              height="500px"
              defaultLanguage="text"
              theme="vs-dark"
              value={input}
              onChange={(value) => {
                setInput(value || '');
                generateQRCode(value || '');
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Generated QR Code</label>
          <div className="h-full border rounded-lg overflow-hidden flex items-center justify-center bg-white">
            {qrCode && (
              <Image 
                src={qrCode} 
                alt="Generated QR Code"
                width={200}
                height={200}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
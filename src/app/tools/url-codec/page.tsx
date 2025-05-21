'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function URLCodec() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convertURL = (value: string) => {
    try {
      setError('');
      if (!value.trim()) {
        setOutput('');
        return;
      }

      if (mode === 'encode') {
        const encoded = encodeURIComponent(value);
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(value);
        setOutput(decoded);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">URL Encoder/Decoder</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode('encode');
              convertURL(input);
            }}
            className={`px-4 py-2 rounded ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Encode
          </button>
          <button
            onClick={() => {
              setMode('decode');
              convertURL(input);
            }}
            className={`px-4 py-2 rounded ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Input URL</label>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
          <div className="h-full border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="text"
              theme="vs-dark"
              value={input}
              onChange={(value) => {
                setInput(value || '');
                convertURL(value || '');
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
          <label className="text-sm font-medium">{mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}</label>
          <div className="h-full border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="text"
              theme="vs-dark"
              value={output}
              options={{
                readOnly: true,
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
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { terserMinify } from '@/lib/minify';
import { format } from 'prettier';

type Language = 'javascript' | 'css' | 'html';

export default function Minifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');

  const minifyCode = async (value: string) => {
    try {
      setError('');
      if (!value.trim()) {
        setOutput('');
        return;
      }

      let result = '';
      switch (language) {
        case 'javascript':
          const minified = await terserMinify(value, {
            mangle: true,
            compress: true,
          });
          result = minified.code || '';
          break;

        case 'css':
          result = await format(value, {
            parser: 'css',
            printWidth: Infinity,
          });
          break;

        case 'html':
          result = await format(value, {
            parser: 'html',
            printWidth: Infinity,
          });
          break;
      }

      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Code Minifier</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setLanguage('javascript');
              minifyCode(input);
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${language === 'javascript' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            JavaScript
          </button>
          <button
            onClick={() => {
              setLanguage('css');
              minifyCode(input);
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${language === 'css' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setLanguage('html');
              minifyCode(input);
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${language === 'html' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            HTML
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-16rem)] min-h-[400px]">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Input Code</label>
            {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
          </div>
          <div className="h-full border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
            <Editor
              height="400px"
              defaultLanguage={language}
              theme="vs-dark"
              value={input}
              onChange={(value) => {
                setInput(value || '');
                minifyCode(value || '');
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Minified Output</label>
          <div className="h-full border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
            <Editor
              height="700px"
              defaultLanguage={language}
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
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
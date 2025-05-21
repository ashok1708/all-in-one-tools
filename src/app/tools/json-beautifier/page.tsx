'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function JSONBeautifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const beautifyJSON = (value: string) => {
    try {
      setError('');
      if (!value.trim()) {
        setOutput('');
        return;
      }

      const parsedJSON = JSON.parse(value);
      const beautified = JSON.stringify(parsedJSON, null, 2);
      setOutput(beautified);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JSON Beautifier</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)] min-h-[400px]">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON Input</label>
            {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
          </div>
          <div className="h-full border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
            <Editor
              height="700px"
              defaultLanguage="json"
              theme="vs-dark"
              value={input}
              onChange={(value) => {
                setInput(value || '');
                beautifyJSON(value || '');
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Beautified Output</label>
          <div className="h-full border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
            <Editor
              height="400px"
              defaultLanguage="json"
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
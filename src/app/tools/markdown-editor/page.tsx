'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { marked } from 'marked';

export default function MarkdownEditor() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState('');

  const convertMarkdown = (value: string) => {
    try {
      if (!value.trim()) {
        setPreview('');
        return;
      }
      const html = marked(value);
      setPreview(html);
    } catch (err) {
      console.error('Error converting markdown:', err);
      setPreview('Error converting markdown');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Markdown Editor</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          <label className="text-sm font-medium">Markdown Input</label>
          <div className="h-full border rounded-lg overflow-hidden">
            <Editor
              height="700px"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={input}
              onChange={(value) => {
                setInput(value || '');
                convertMarkdown(value || '');
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on'
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preview</label>
          <div 
            className="h-full border rounded-lg overflow-auto p-4 prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
    </div>
  );
}
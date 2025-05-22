'use client';

import { useState } from 'react';
import { marked } from 'marked';
import { Editor } from '@monaco-editor/react';

export default function MarkdownEditor() {
    const [input, setInput] = useState('');
    const [preview, setPreview] = useState('');

    const convertMarkdown = async (value: string) => {
        if (!value.trim()) {
            setPreview('');
            return;
        }

        try {
            const html = await marked(value);
            setPreview(html);
        } catch (error) {
            console.error('Error converting markdown:', error);
            setPreview('Error converting markdown');
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Markdown Editor</h1>

            <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)] min-h-[400px]">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Markdown Input</label>
                    <div className="h-full border rounded-lg overflow-hidden">
                        <Editor
                            height="700px"
                            defaultLanguage="markdown"
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => {
                                const val = value || '';
                                setInput(val);
                                convertMarkdown(val);
                            }}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Preview</label>
                    <div 
                        className="h-full border rounded-lg p-4 overflow-auto prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: preview }}
                    />
                </div>
            </div>
        </div>
    );
}
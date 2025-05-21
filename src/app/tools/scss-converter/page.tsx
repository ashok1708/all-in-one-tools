'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function SCSSConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const convertSCSS = async (value: string) => {
        if (!value.trim()) {
            setOutput('');
            setError('');
            return;
        }

        try {
            const res = await fetch('/api/compile-scss', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scss: value }),
            });

            const data = await res.json();

            if (res.ok) {
                setOutput(data.css);
                setError('');
            } else {
                setOutput('');
                setError(data.error || 'Failed to compile');
            }
        } catch (err) {
            setOutput('');
            setError('Network error');
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">SCSS to CSS Converter</h1>

            <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)] min-h-[400px]">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">SCSS Input</label>
                        {error && <span className="text-sm text-red-500">{error}</span>}
                    </div>
                    <div className="h-full border rounded-lg overflow-hidden">
                        <Editor
                            height="700px"
                            defaultLanguage="scss"
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => {
                                const val = value || '';
                                setInput(val);
                                convertSCSS(val);
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
                    <label className="text-sm font-medium">CSS Output</label>
                    <div className="h-full border rounded-lg overflow-hidden">
                        <Editor
                            height="700px"
                            defaultLanguage="css"
                            theme="vs-dark"
                            value={output}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
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

'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function ColorPicker() {
  const [color, setColor] = useState('#000000');
  const [output, setOutput] = useState('');

  const updateColorFormats = (value: string) => {
    try {
      const hex = value.toLowerCase();
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      const formats = [
        `HEX: ${hex}`,
        `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        `HSL: hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
      ].join('\n');

      setOutput(formats);
    } catch (err) {
      setOutput('Invalid color format');
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Invalid hex color');
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Color Picker</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Color</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                updateColorFormats(e.target.value);
              }}
              className="h-12 w-24"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                updateColorFormats(e.target.value);
              }}
              className="flex-1 px-3 py-2 border rounded"
              placeholder="#000000"
            />
          </div>
          <div className="h-40 rounded-lg" style={{ backgroundColor: color }} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Color Formats</label>
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
                lineNumbers: 'off',
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
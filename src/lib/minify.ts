import { minify, type MinifyOptions } from 'terser';
import { minify as minifyCSS } from 'csso';

export interface TerserMinifyResult {
  code: string;
  map?: string;
  error?: Error;
}

export async function terserMinify(code: string, options: MinifyOptions = {}): Promise<TerserMinifyResult> {
  try {
    const result = await minify(code, {
      ...options,
      sourceMap: false,
    });

    return {
      code: result.code || '',
      map: result.map?.toString(),
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Minification failed');
  }
}

interface MinifyResult {
  code: string;
  map?: string;
}

export async function minifyCode(code: string, type: 'js' | 'css'): Promise<MinifyResult> {
  try {
    const result = type === 'js'
      ? await terserMinify(code)
      : { code: minifyCSS(code).css };

    return {
      code: result.code || '',
      map: undefined,
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Minification failed');
  }
}
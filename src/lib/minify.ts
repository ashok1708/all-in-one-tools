import { minify, type MinifyOptions } from 'terser';

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
      map: result.map,
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Minification failed');
  }
}
// src/app/api/compile-scss/route.ts
import { NextResponse } from 'next/server';
import { compileString } from 'sass';

interface ScssRequest {
  scss: string;
}

export async function POST(request: Request) {
    try {
        const { scss }: ScssRequest = await request.json();

        if (!scss) {
            return NextResponse.json({ error: 'Missing SCSS input' }, { status: 400 });
        }

        const result = compileString(scss);
        return NextResponse.json({ css: result.css });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Compilation error';
        return NextResponse.json(
            { error: errorMessage },
            { status: 400 }
        );
    }
}

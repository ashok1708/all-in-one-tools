// src/app/api/compile-scss/route.ts
import { NextResponse } from 'next/server';
import { compileString } from 'sass';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const scss = body.scss;

        if (!scss) {
            return NextResponse.json({ error: 'Missing SCSS input' }, { status: 400 });
        }

        const result = compileString(scss);
        return NextResponse.json({ css: result.css });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Compilation error' },
            { status: 400 }
        );
    }
}

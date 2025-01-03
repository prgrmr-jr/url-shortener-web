import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();
    
    try{
        const savedUrl = await prisma.saved_url.findUnique({
            where: { shortUrl: slug },
            select: { originalUrl: true },
        });
        if (!savedUrl) {
            return NextResponse.json({ error: "Short URL not found" }, { status: 404 });
        }
        return NextResponse.redirect(savedUrl.originalUrl);
    } catch (error) {
        console.error("Error retrieving URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
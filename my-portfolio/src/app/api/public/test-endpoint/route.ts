import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
    return NextResponse.json({ message: "Request from test endpoint successful" }, { status: 200 });
}
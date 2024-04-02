import { NextResponse } from "next/server";

export async function GET(request : Request) {
    return NextResponse.json({ message: "Request from test endpoint successful" }, { status: 200 });
}
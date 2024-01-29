import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request : Request) {
  // TypeScript Warning: Response.json() is only valid from TypeScript 5.2. If you use a lower TypeScript version, you can use NextResponse.json() for typed responses instead.
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request : Request) {
  // TypeScript Warning: Response.json() is only valid from TypeScript 5.2. If you use a lower TypeScript version, you can use NextResponse.json() for typed responses instead.
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
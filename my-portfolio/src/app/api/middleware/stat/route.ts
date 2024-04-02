import { NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';

export async function POST(request : Request) {
    const data = await request.json();
    const date = data["date"];
    const ip   = data["ip"];

    if(date == null || ip == null) {
        return NextResponse.json({ message: "Missing date or ip" }, { status: 401 });
    }

    let response = await stats_db.create_stat(date, ip);

    console.log('Stat created successfully: ' + ip + " " + date);

    return NextResponse.json({ user: {
        id      : response.insertedId.toString(),
        message : 'Stat created successfully'
    }}, { 
        status: 200 }
    );
}
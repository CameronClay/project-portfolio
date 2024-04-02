import { NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';

export async function GET(request : Request) {
    const url = new URL(request.url);
    let stat : stats_db.Stat | null = null;
    if(url.searchParams.get("entry_id") != null) {
        const entry_id = url.searchParams.get("entry_id") as string;
        stat = await stats_db.get_stat(entry_id);
    }

    return NextResponse.json({ stat: stat }, { status: 200 });
}
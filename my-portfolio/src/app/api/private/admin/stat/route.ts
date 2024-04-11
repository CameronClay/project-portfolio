import { NextRequest, NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';
import { validate_user_info } from '@src/lib/auth';

export async function GET(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const url = new URL(request.url);
    let stat : stats_db.Stat | null = null;
    if(url.searchParams.get("entry_id") != null) {
        const entry_id = url.searchParams.get("entry_id") as string;
        stat = await stats_db.get_stat(entry_id);
    }

    return NextResponse.json({ stat: stat }, { status: 200 });
}
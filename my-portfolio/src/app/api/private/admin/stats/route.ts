import { NextRequest, NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';
import { validate_user_info } from '@src/lib/auth';

export async function GET(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const url = new URL(request.url);
    let stats : stats_db.Stat[] | null = null
    // if(url.searchParams.get("entry_id") == null) {
        stats = await stats_db.get_stats();
    // }
    // else {
    //     const entry_id = url.searchParams.get("entry_id") as string
    //     stats = [await stats_db.get_stat(entry_id)]
    // }

    return NextResponse.json({ stats: stats }, { status: 200 });
}

export async function DELETE(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const result = await stats_db.clear_stats();
    if(result.acknowledged) {
        return NextResponse.json({ message: "Stats cleared" }, { status: 200 });
    }
    else {
        return NextResponse.json({ message: "Failed to clear stats" }, { status: 500 });
    }
}
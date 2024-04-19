import { NextRequest, NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/middleware-api-params';

export async function POST(request : NextRequest) {
    let { data, response } = await parse_params_resp(request, params.create_stat as Param[]);
    if(response !== null) {
        return response;
    }
    const date = data["date"];
    const ip   = data["ip"];

    if(date == null || ip == null) {
        return NextResponse.json({ message: "Missing date or ip" }, { status: 401 });
    }

    let resp = await stats_db.create_stat(date, ip);

    return NextResponse.json({ user: {
        id      : resp.insertedId.toString(),
        message : 'Stat created successfully'
    }}, { 
        status: 200 }
    );
}
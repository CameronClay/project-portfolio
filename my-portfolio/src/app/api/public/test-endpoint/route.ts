import { NextRequest, NextResponse } from "next/server";
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

export async function GET(request : NextRequest) {
    const { data, response } = await parse_params_resp(request, params.test as Param[]);
    if(response !== null) {
        return response;
    }

    return NextResponse.json({ message: "Request from test endpoint successful" }, { status: 200 });
}
//logging utility function that logs to console and logfare.
export async function log_ext(message: string) {
    console.log(message);
    // console.log(process.env.LOGFARE_API_URL);
    if (process.env.LOGFARE_API_KEY !== undefined) {
        //send to log server
        try {
            const response = await fetch(
                process.env.LOGFARE_API_URL as string,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": process.env.LOGFARE_API_KEY
                    },
                    body: JSON.stringify({
                        'noobert': 'true',
                        'message': message
                    }),
                }
            )

            // console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    return null;
}
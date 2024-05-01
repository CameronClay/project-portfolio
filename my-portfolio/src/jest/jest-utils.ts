export function is_running_with_jest() {
    return process.env.JEST_WORKER_ID !== undefined;
}
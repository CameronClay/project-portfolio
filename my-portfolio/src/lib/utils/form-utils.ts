export const formdata_to_json = (
    formData: FormData
): Record<string, string> => {
    const object: Record<string, string> = {};
    formData.forEach((value, key) => (object[key] = value as string));
    return object;
};

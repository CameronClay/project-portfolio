export const formdata_to_json = (formData : FormData) : object => {
    var object : object = {};
    formData.forEach((value, key) => object[key] = value);
    return object;
}
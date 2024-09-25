export function getApiUrl(suffix) {
    return process.env.REACT_APP_API_URL + "/api" + suffix;
}
export function getSanctumUrl(suffix) {
    return process.env.REACT_APP_API_URL + suffix;
}
export default function debounce(limit, callback) {
    let timeoutId
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(callback, limit, args)
    }
}

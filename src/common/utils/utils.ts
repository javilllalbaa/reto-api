export const serializeQs = (parameters) => {
    return Object.keys(parameters).map((p, i) => (i == 0 ? '?' : "&") + p + "=" + parameters[p])
        .reduce((a, b) => a + b, "")
}
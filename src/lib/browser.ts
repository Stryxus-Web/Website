
export const isHDR = isHDRFunc();
function isHDRFunc(): boolean {
    return window.matchMedia("(dynamic-range: high)").matches;
}
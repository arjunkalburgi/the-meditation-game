export const secondsToDisplayTime = (seconds: number): string => {
    const s = seconds % 60;
    return (seconds/60 > 1 ? `${Math.floor(seconds / 60)}:` : '') + `${s < 10 ? "0" : ""}${s}`;
}

/**
* Converts seconds to minutes, with 1 decimal place only when needed
* @param s Seconds to convert
* @returns Minutes as a number (whole number if possible, otherwise with 1 decimal place)
*/
export function sToMin(s: number): number {
    const m = s / 60;
    if (Number.isInteger(m)) return m;
    return Math.round(m * 10) / 10;
}
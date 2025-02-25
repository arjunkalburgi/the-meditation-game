export const secondsToDisplayTime = (seconds: number): string => {
    const s = seconds % 60;
    return (seconds/60 > 1 ? `${Math.floor(seconds / 60)}:` : '') + `${s < 10 ? "0" : ""}${s}`;
}
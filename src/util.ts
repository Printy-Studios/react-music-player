export function secondsToMinutesAndSeconds(time: number) {
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    console.log(time);
    console.log(minutes);
    console.log(seconds);

    return {
        minutes,
        seconds
    }
}

export function numberToPercent(n: number, max_n: number) {
    const percentage = n == 0 ? 0 : (n / max_n) * 100;
    return percentage
}

export function percentOf(n: number, percentage: number) {
    return n * percentage / 100
}
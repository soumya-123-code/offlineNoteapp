export function makeId(): string {
    return Date.now().toString() + Math.random().toString().slice(2);
}
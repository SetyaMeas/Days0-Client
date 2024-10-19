export function isValidEmail(value: string) {
    const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.com)$/;
    return regex.test(value);
}

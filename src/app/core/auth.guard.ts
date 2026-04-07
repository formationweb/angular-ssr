export function authGuard() {
    const token = localStorage.getItem('token')
    return !!token
}
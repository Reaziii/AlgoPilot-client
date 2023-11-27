"use client"
export function addCookie(name:string, value:string) {
    window.document.cookie = name + "=" + value + ";path=/";
}

export function deleteCookie(name:string) {
    window.document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

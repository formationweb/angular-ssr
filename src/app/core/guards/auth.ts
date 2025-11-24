import { isPlatformServer } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { LocalStorageService } from "../localstorage";

export function authGuard() {
    const platform = inject(PLATFORM_ID)
    const localStorage = inject(LocalStorageService)
    if (isPlatformServer(platform)) {
        return true
    }
    const token = localStorage.getItem('token');
    return !!token;
}
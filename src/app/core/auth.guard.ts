import { isPlatformServer } from "@angular/common"
import { inject, PLATFORM_ID } from "@angular/core"
import { LocalStorageService } from "./localstorage"

export function authGuard() {
    const platformId = inject(PLATFORM_ID)
    const localStorageService = inject(LocalStorageService)
    if (isPlatformServer(platformId)) {
        return true
    }
    const token = localStorageService.getItem('token')
    return !!token
}
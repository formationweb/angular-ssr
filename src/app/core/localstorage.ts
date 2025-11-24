import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private platform = inject(PLATFORM_ID)

    getItem(key: string): string | null {
        if (isPlatformBrowser(this.platform)) {
            return localStorage.getItem(key)
        }
        return null
    }
}
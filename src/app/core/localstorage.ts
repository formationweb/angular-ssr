import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
   platformId = inject(PLATFORM_ID)
   keys = new Map()

   getItem(val: string) {
     if (isPlatformBrowser(this.platformId)) {
       return localStorage.getItem(val)
     }
     return this.keys.get(val)
   }

   setItem(key: string, val: string) {
      if (isPlatformBrowser(this.platformId)) {
       return localStorage.setItem(key, val)
     }
     return this.keys.set(key, val)
   }
}

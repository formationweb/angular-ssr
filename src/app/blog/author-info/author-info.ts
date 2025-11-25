import { Component, inject, REQUEST, signal } from '@angular/core';

@Component({
  selector: 'app-author-info',
  imports: [],
  templateUrl: './author-info.html',
  styleUrl: './author-info.css'
})
export class AuthorInfo {
  private request = inject(REQUEST)
  userAgent = this.request?.headers.get('user-agent')
}

import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class ArticleComponent {
  private platform = inject(PLATFORM_ID)
  isBrowser = isPlatformBrowser(this.platform)

  test() {}
}

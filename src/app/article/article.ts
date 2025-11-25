import { Component } from '@angular/core';
import { Content } from "./content/content";
import { ShareWidget } from "./share-widget/share-widget";
import { RelatedArticles } from "./related-articles/related-articles";
import { Comments } from "./comments/comments";
import { Newsletter } from "./newsletter/newsletter";

@Component({
  selector: 'app-article',
  imports: [Content, ShareWidget, RelatedArticles, Comments, Newsletter],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class ArticleComponent {

}

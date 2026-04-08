import { Component } from '@angular/core';
import { Example } from "../test";

@Component({
  selector: 'app-article',
  imports: [Example],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {}

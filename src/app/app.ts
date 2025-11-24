import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Articles } from "./articles/articles";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Articles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp');
}

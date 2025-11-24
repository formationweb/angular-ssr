import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Articles } from "./articles/articles";
import { Draw } from "./draw/draw";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Articles, Draw],
  template: `<router-outlet />`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp');
}

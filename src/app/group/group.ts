import { Component, inject, REQUEST_CONTEXT, signal } from '@angular/core';

@Component({
  selector: 'app-group',
  imports: [],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class Group {
  private requestContext = inject<{
    group: string
  } | null>(REQUEST_CONTEXT)
  group = signal(this.requestContext?.group)
}

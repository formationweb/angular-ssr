import { Component, DOCUMENT, ElementRef, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-example',
  template: '<div><span>world</span></div>',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class Example {
  document = inject(DOCUMENT);
  title = inject(Title)

  hostElement = inject(ElementRef).nativeElement;
  ngOnInit() {
    const newNode = this.document.createElement('p');
    newNode.innerHTML = 'Hello';
    this.hostElement.insertBefore(newNode, this.hostElement.firstChild);
  }
}

import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, OnInit, PLATFORM_ID, viewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  imports: [],
  template: ` <canvas #canvasRef></canvas> `,
})
export class Draw implements OnInit {
  private platformId = inject(PLATFORM_ID);

  canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const el = this.canvasEl()?.nativeElement;
    if (el) {
      const context = el.getContext('2d');
      if (context) {
        context.fillStyle = 'blue';
        context.fillRect(0, 0, 100, 100);
      }
    }
  }
}

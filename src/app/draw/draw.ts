import { isPlatformServer } from '@angular/common';
import {
  afterEveryRender,
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-draw',
  imports: [],
  template: `<canvas #canvasRef></canvas>`,
})
export class Draw {
  private platformId = inject(PLATFORM_ID);

  canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');

  constructor() {
    afterEveryRender(() => {
        const el = this.canvasEl()?.nativeElement;
        if (el) {
          const context = el.getContext('2d');
          if (context) {
            ((context.fillStyle = '#ff0000'), context.fillRect(0, 0, 100, 100));
          }
        }
    })
  }

  // ngOnInit(): void {
  //   if (isPlatformServer(this.platformId)) {
  //     return;
  //   }
  //   const el = this.canvasEl()?.nativeElement;
  //   if (el) {
  //     const context = el.getContext('2d');
  //     if (context) {
  //       ((context.fillStyle = '#ff0000'), context.fillRect(0, 0, 100, 100));
  //     }
  //   }
  // }
}

import { isPlatformBrowser } from '@angular/common';
import { afterEveryRender, afterNextRender, Component, effect, ElementRef, inject, OnInit, PLATFORM_ID, viewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  imports: [],
  template: ` <canvas #canvasRef></canvas> `,
})
export class Draw {
  private platformId = inject(PLATFORM_ID);

  canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');

  constructor() {
    // afterNextRender: ne s'exécute jamais côté serveur, s'execute qu'une fois
    // afterEveryRender: ne s'exécute jamais côté serveur, s'execute plusieurs fois (ancien nom: afterRender)
    afterEveryRender(() => {
      const el = this.canvasEl()?.nativeElement;
      if (el) {
        const context = el.getContext('2d');
        if (context) {
          context.fillStyle = 'blue';
          context.fillRect(0, 0, 100, 100);
        }
      }
    })
  }

  // ngOnInit(): void {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return;
  //   }
  //   const el = this.canvasEl()?.nativeElement;
  //   if (el) {
  //     const context = el.getContext('2d');
  //     if (context) {
  //       context.fillStyle = 'blue';
  //       context.fillRect(0, 0, 100, 100);
  //     }
  //   }
  // }
}

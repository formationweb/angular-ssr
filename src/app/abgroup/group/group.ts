import { Component, inject, PLATFORM_ID, REQUEST_CONTEXT } from '@angular/core';
import { ComponentA } from '../component-a/component-a';
import { ComponentB } from '../component-b/component-b';
import { isPlatformServer } from '@angular/common';

interface RequestContext {
  group: 'a' | 'b'
}

@Component({
  selector: 'app-group',
  imports: [ComponentA, ComponentB],
  template: `
    @defer (hydrate never) {
      @if (isServer) {
        <div>
          @if (group == 'a') {
            <app-component-a /> 
          }
          @else {
            <app-component-b />
          }
        </div>
      }
    }
  `
})
export class Group {
  private requestContext = inject<RequestContext | null>(REQUEST_CONTEXT)
  private platform = inject(PLATFORM_ID)
  isServer = isPlatformServer(this.platform)
  group = this.requestContext?.group
}

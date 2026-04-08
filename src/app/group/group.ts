import { isPlatformServer } from '@angular/common';
import { Component, inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';

const GROUP_TOKEN = makeStateKey<'a' | 'b' | null>('group')

@Component({
  selector: 'app-group',
  imports: [],
  template: `
    @if (group() == 'a') {
      <div>A</div>
    }
    @else  {
      <div>B</div>
    }
  `,
})
export class Group {
  private requestContext = inject<{
    group: string
  } | null>(REQUEST_CONTEXT)
  private platformId = inject(PLATFORM_ID)
  private transferState = inject(TransferState)
  private isServer = isPlatformServer(this.platformId)
  group = signal(this.requestContext?.group)

  constructor() {
    const groupCached = this.transferState.get(GROUP_TOKEN, null)
    if (this.isServer) {
      this.transferState.set(GROUP_TOKEN, this.group())
    }
    if (groupCached) {
      this.group.set(groupCached)
    }
  }
}

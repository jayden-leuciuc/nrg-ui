import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type RouterService from '@ember/routing/router-service';
import type { ComponentLike } from '@glint/template';

type RouteOrComponent = ComponentLike | string;

export default class NavigationService extends Service {
  @service
  declare router: RouterService;

  @tracked
  stack: Array<RouteOrComponent> = [];

  initialize(initialRoute: RouteOrComponent): void {
    this.stack = [initialRoute];

    if (typeof initialRoute === 'string') {
      this.router.transitionTo(initialRoute);
    }
  }

  push(viewOrRoute: RouteOrComponent): void {
    this.stack = [...this.stack, viewOrRoute];

    if (typeof viewOrRoute === 'string') {
      this.router.transitionTo(viewOrRoute);
    }
  }

  pop(): void {
    if (this.stack.length > 1) {
      const previous = this.stack[this.stack.length - 2];
      this.stack = this.stack.slice(0, -1);

      if (typeof previous === 'string') {
        this.router.transitionTo(previous);
      }
    }
  }

  get topView(): RouteOrComponent | null {
    return this.stack[this.stack.length - 1] ?? null;
  }

  get canGoBack(): boolean {
    return this.stack.length > 1;
  }
}

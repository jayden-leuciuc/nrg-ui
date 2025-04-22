import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { ComponentLike } from '@glint/template';

type RouteOrComponent = ComponentLike | string;

export interface NavigationStackSignature {
  Element: HTMLDivElement;
  Args: {
    initialRoute: RouteOrComponent;
    onRouteChange?: (routeName: string) => void;
  };
  Blocks: {
    default: [];
  };
}

class NavigationStack extends Component<NavigationStackSignature> {
  @service
  declare router: RouterService;

  @tracked
  stack: Array<RouteOrComponent> = [this.args.initialRoute];

  constructor(owner: unknown, args: NavigationStackSignature['Args']) {
    super(owner, args);

    if (typeof this.args.initialRoute === 'string' && this.args.onRouteChange) {
      this.args.onRouteChange(this.args.initialRoute);
    }
  }

  @action
  push(viewOrRoute: RouteOrComponent): void {
    this.stack = [...this.stack, viewOrRoute];

    if (typeof viewOrRoute === 'string' && this.args.onRouteChange) {
      this.args.onRouteChange(viewOrRoute);
    }
  }

  @action
  pop(): void {
    if (this.stack.length > 1) {
      const previous = this.stack[this.stack.length - 2];
      this.stack = this.stack.slice(0, -1);

      if (typeof previous === 'string' && this.args.onRouteChange) {
        this.args.onRouteChange(previous);
      }
    }
  }

  get topView(): RouteOrComponent | null {
    return this.stack[this.stack.length - 1] ?? null;
  }

  get isCurrentRouteView(): boolean {
    return typeof this.topView === 'string';
  }

  get canGoBack(): boolean {
    return this.stack.length > 1;
  }

  <template>
    {{#if this.topView}}
      {{#if this.isCurrentRouteView}}
        {{outlet}}
      {{else}}
        {{yield}}
      {{/if}}
    {{/if}}
  </template>
}

export default NavigationStack;

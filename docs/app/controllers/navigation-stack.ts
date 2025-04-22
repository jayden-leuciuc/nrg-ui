import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

export default class NavigationStackController extends Controller {
  @service
  declare router: RouterService;

  @action
  handleRouteChange(routeName: string): void {
    setTimeout(() => {
      this.router.transitionTo(routeName);
    }, 0);
  }
}

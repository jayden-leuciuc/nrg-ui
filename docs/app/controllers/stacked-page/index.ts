import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type { NavigationService } from 'docs/app/services/navigation';

export default class StackedPageIndexController extends Controller {
  @service
  declare router: RouterService;

  @service
  declare navigation: NavigationService;

  @action
  goBack(): void {
    if (this.navigation.canGoBack) {
      this.navigation.pop();
    } else {
      window.history.back();
    }
  }
}

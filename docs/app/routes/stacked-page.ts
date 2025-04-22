import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type { NavigationService } from 'docs/app/services/navigation';

export default class StackedPageRoute extends Route {
  @service
  declare navigation: NavigationService;

  beforeModel() {
    this.navigation.initialize('stacked-page.index');
  }

  @action
  willTransition() {
    if (this.navigation.stack.length === 0) {
      this.navigation.initialize('stacked-page.index');
    }
  }
}

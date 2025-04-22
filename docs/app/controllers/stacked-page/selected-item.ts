import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type { NavigationService } from 'docs/app/services/navigation';

export default class StackedPageSelectedItemController extends Controller {
  @service
  declare navigation: NavigationService;

  @action
  goBack(): void {
    this.navigation.pop();
  }
}

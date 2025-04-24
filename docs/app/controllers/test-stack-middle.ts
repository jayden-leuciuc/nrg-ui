import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type NavigationService from 'docs/services/navigation';

export default class TestStackMiddleController extends Controller {
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

  @action
  progress(): void {
    this.navigation.push('test-stack-middle');
  }
}

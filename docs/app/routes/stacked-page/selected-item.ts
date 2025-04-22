import Route from '@ember/routing/route';

export default class StackedPageSelectedItemRoute extends Route {
  model(params: { item_id: string }) {
    return params.item_id;
  }
}

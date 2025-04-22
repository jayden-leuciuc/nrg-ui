import Route from '@ember/routing/route';

export default class StackedPageSelectedItemSelectedSubitemRoute extends Route {
  model(params: { subitem_id: string }) {
    return params.subitem_id;
  }
}

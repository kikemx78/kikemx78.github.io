import angular from 'angular';

const searchMore = {
  bindings: {
    compAttrs: '<',
    actionCtrl: '&',
    mySearch: '<'
  },
  template: require('./search_more.html'),
  controller: class {

    get mdButAttrs() {
      return this.compAttrs.mdButton;
    }

    bttClicked(e) {
      this.actionCtrl({e: 'more'});
    }
  }
};

export default angular.module('components.search_more', [])
  .component('searchMore', searchMore)
  .name;
  
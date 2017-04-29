import angular from 'angular';

const mdCardFooter = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./md_card_footer.html'),
  controller: class {
    
    get getAttrs() {
      return this.compAttrs;
    }

    cardAction() {
      console.log('this card has been clicked');
    }
  }
};

export default angular.module('components.mdCardFooter', [])
  .component('mdCardFooter', mdCardFooter)
  .name;
  
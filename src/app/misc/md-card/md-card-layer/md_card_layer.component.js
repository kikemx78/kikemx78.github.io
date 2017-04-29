import angular from 'angular';

const mdCardLayer = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./md_card_layer.html'),
  controller: class {
    
    get getAttrs() {
      this.compAttrs.text = this.compAttrs.type === 'artist' ? 'View albums' : 'View tracks'
      return this.compAttrs;
    }

    cardAction() {
      console.log('this card has been clicked');
    }
  }
};

export default angular.module('components.mdCardLayer', [])
  .component('mdCardLayer', mdCardLayer)
  .name;
  
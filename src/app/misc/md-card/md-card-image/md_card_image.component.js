import angular from 'angular';

const mdCardImage = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./md_card_image.html'),
  controller: class {
    
    get getAttrs() {
      return this.compAttrs;
    }

    cardAction() {
      console.log('this card has been clicked');
    }
  }
};

export default angular.module('components.mdCardImage', [])
  .component('mdCardImage', mdCardImage)
  .name;
  
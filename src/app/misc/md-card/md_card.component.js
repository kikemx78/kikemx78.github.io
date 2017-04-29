import angular from 'angular';
import mdCardLayer from './md-card-layer/md_card_layer.component';
import mdCardImage from './md-card-image/md_card_image.component';
import mdCardFooter from './md-card-footer/md_card_footer.component';

const mdCard = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./md_card.html'),
  controller: class {

    get getAttrs() {
      return this.compAttrs;
    }
    cardAction() {
      
    }
  }
};

export default angular.module('components.md_card', [mdCardLayer, mdCardFooter, mdCardImage])
  .component('mdCard', mdCard)
  .name;
  
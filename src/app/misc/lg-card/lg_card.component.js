import angular from 'angular';
import lgCardHeader from './lg-card-header/lg_card_header.component';
import lgCardContent from './lg-card-content/lg_card_content.component';

const lgCard = {
  bindings: {
    data: '<'
  },
  template: require('./lg_card.html'),
  controller: class {
    

  }
};

export default angular.module('components.lg_card', [lgCardHeader, lgCardContent])
  .component('lgCard', lgCard)
.name;

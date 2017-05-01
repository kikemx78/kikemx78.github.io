import angular from 'angular';

const lgCardHeader = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./lg_card_header.html'),
  controller: class {
    
    $onInit() {
      
    }

    get getAttrs() { 
       
      this.compAttrs.text = this.compAttrs.source === 'artist' ? 'Albums by' : 'Tracks on';
      this.compAttrs.text = this.compAttrs.source === undefined ? '' : this.compAttrs.text;
      return this.compAttrs;
    }

  }
};

export default angular.module('components.lg_card_header', [])
  .component('lgCardHeader', lgCardHeader)
.name;

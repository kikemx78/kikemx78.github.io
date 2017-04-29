import angular from 'angular';

const lgCardContent = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./lg_card_content.html'),
  controller: class {
    get getAttrs() {
      return this.compAttrs;
    }

    convertMe(ms){
      let mins = Math.floor(ms / 60000);
      let secs = ((ms % 60000) / 1000).toFixed(0);
      return mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

  }
};

export default angular.module('components.lg_card_content', [])
  .component('lgCardContent', lgCardContent)
.name;

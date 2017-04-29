import angular from 'angular';

const selectedItem = {
  bindings: {
    data: '<',
    compAttrs: '<'
  },
  template: require('./selected_item.html'),
  controller: class {
    get getAttrs() {
      return this.compAttrs;
    }

    convertMe(ms) {
      let mins = Math.floor(ms / 60000);
      let secs = ((ms % 60000) / 1000).toFixed(0);
      return mins + ":" + (secs < 10 ? '0' : '') + secs;
    }
    
  }
};

export default angular.module('components.selected_item', [])
  .component('selectedItem', selectedItem)
.name;

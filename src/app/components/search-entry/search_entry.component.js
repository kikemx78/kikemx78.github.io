import angular from 'angular';

const searchEntry = {
  bindings: {
    actionCtrl: '&',
    compAttrs: '<',
    modelCtrl: '='
  }, 
  template: require('./search_entry.html'),
  controller: class SearchEntryController {
    
    get inputAttrs() {
      return this.compAttrs.lgInput.attrs;
    }

    get mdButAttrs() {
      return {
        attrs : this.compAttrs.mdButton.attrs,
        style: this.compAttrs.mdButton.style
      }
    }

    bttClicked(e, modelCtrl) {
      
      this.actionCtrl({e: 'search', modelCtrl: modelCtrl});
      
    }
  }
};

export default angular.module('components.search_entry', [])
  .component('searchEntry', searchEntry)
.name;

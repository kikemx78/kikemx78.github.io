import angular from 'angular';

const resultsGallery = {
  bindings: {
    data: '<',
    actionClick: '&'
  },
  template: require('./results_gallery.html'),
  controller: class {

    clickedCard($index) {
      let item = this.data[$index].id;
      let image = this.data[$index].images[0].url
      let source = this.data[$index].type;
      this.actionClick({item, source, image});
      
    }

  }
};

export default angular.module('components.resultsGallery', [])
  .component('resultsGallery', resultsGallery)
  .name;
  
import angular from 'angular';

const jumbo = {
  bindings: {
    compAttrs: '<'
  },
  template: require('./jumbo.html'),
  controller: class {

    get getAttrs() {
      return this.compAttrs.attrs;
    }

    get getStyle() {

      const compStyle = this.compAttrs.style;
      if (compStyle !== undefined) {
        return {
          'background-color': compStyle.backgroundColor,
          'color': compStyle.color,
          'background-image': `url(./img/${compStyle.image})`  
        }
      }

    }
  }
};

export default angular.module('components.jumbo', [])
  .component('jumbo', jumbo)
  .name;
  
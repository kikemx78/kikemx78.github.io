import angular from 'angular';

const mdButton = {
  bindings: {
    bttAttrs: '<',
    bttStyle: '<',
    actionClick: '&'
  },
  template: require('./md_button.html'),
  controller: class {

    get getAttrs() {
      return this.bttAttrs;
    }

    get getStyle() {
      if (this.bttStyle !== undefined) {
        return {
          'background-color': this.bttStyle.backgroundColor,
          'color': this.bttStyle.color
        }
      }
    }

    buttonAction() {
      this.actionClick();
    }

  }
};

export default angular.module('components.md_button', [])
  .component('mdButton', mdButton)
  .name;
  
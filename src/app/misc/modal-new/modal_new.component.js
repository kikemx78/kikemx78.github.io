import angular from 'angular';
import { closeModal } from './helpers';

const modalNew = {
  bindings: {
    data: '<'
  },
  template: require('./modal_new.html'),
  controller: class {
 
    closeModal() {
      closeModal();
    }

  }
  
};

export default angular.module('components.modal_new', [])
  .component('modalNew', modalNew)
  .name;
  
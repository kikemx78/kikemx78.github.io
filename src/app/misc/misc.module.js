import jumbo from './jumbo/jumbo.component';
import mdButton from './md-button/md_button.component';
import mdCard from './md-card/md_card.component';
import modalNew from './modal-new/modal_new.component';
import lgCard from './lg-card/lg_card.component';

export const misc = angular
  .module('misc', [jumbo, mdButton, mdCard, modalNew, lgCard])
  .name;
  
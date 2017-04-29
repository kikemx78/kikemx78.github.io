export const openModal = (window) =>  {
  
  const el = angular.element;
  const winHeight = window.scrollMaxY !== undefined ? window.scrollMaxY : window.document.documentElement.scrollHeight - window.document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset;
  const vwHeight = window.innerHeight;

  const bdy = el(document.querySelector('body'));
  
  const modalCont = el(document.querySelector('.modal-cont'));
  const modal = el(document.querySelector('.modal'));
  const tableCont = el(document.querySelector('.table-cont'))[0].offsetTop;
  
  modalCont.addClass('active');
  bdy.css('overflow', 'hidden');
  modalCont.css('height', (winHeight + vwHeight) + 'px');
  modal.css('top', (scrollTop + (vwHeight / 2) - (tableCont / 2)) + 'px');

}

export const closeModal = (window) => {
  const el = angular.element;
  const bdy = el(document.querySelector('body'));
  const modalCont = el(document.querySelector('.modal-cont'));
  modalCont.removeClass('active');
  bdy.css('overflow', 'scroll');
}

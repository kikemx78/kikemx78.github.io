import mdButton from './md_button.component';

describe('mdButton Component', () => {

  let parentScope;
  let element;

  const findIn = (element, selector) => {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(angular.mock.module(mdButton));

  beforeEach(inject(($compile, $rootScope) => {
    parentScope = $rootScope.$new();
    parentScope.mdButAttrs = { attrs: { buttonText: 'SEARCH MORE!' }, style: { 'color': 'rgb(255, 192, 203)'} };
    parentScope.bttClickSpy = jasmine.createSpy('bttClickSpy');

    element = angular.element(`<md-button btt-attrs="mdButAttrs.attrs" btt-style="mdButAttrs.style" action-click="$ctrl.bttClicked({bttAttr})"/>`);
      $compile(element)(parentScope);
      parentScope.$digest();
    }));

  it('displays button text ', () => {
    const someAttrValue = findIn(element, '.md-button').text();
    expect(someAttrValue).toEqual('SEARCH MORE!');
  
  });

   it('displays initial value of some button style ', () => {
    const someAttrValue = findIn(element, '.md-button').css('color');
    expect(someAttrValue).toEqual('rgb(255, 192, 203)');
  
  });

});
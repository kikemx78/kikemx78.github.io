import jumbo from './jumbo.component';


describe('Jumbo Component', () => {
  
  let parentScope;
  let element;

  const findIn = (element, selector) => {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(angular.mock.module(jumbo));

  beforeEach(inject(($compile, $rootScope) => {
    parentScope = $rootScope.$new();
    parentScope.jumboCompAttrs = { attrs: { rightText: 'left mock'  }, style: { 'color': 'rgb(255, 192, 203)'} };
    element = angular.element(`<jumbo comp-attrs="jumboCompAttrs"></jumbo>`);
    $compile(element)(parentScope);
    parentScope.$digest();
  }));

  it('displays left text attr ', () => {
    const someAttrValue = findIn(element, '.jumbo-text').text();
    expect(someAttrValue).toEqual('left mock');
  
  });

   it('displays initial value of some style ', () => {
    const someAttrValue = findIn(element, '.jumbo').css('color');
    expect(someAttrValue).toEqual('rgb(255, 192, 203)');
  
  })

});
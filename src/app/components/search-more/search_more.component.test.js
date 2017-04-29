import searchMore from './search_more.component';

describe('Search More Component', () => {
  
  let parentScope;
  let element;

  const findIn = (element, selector) => {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(angular.mock.module(searchMore));

  beforeEach(inject(($compile, $rootScope) => {
    parentScope = $rootScope.$new();
    parentScope.bttClickSpy = jasmine.createSpy('bttClickSpy')

    element = angular.element(`<search-more action-ctrl="bttClickSpy(e, mySearch)"/> `);
    $compile(element)(parentScope);
    parentScope.$digest();
  }));

  it('invokes action with a param ', () => {
    const bttClickButton = findIn(element, '.but-cont');
    bttClickButton.triggerHandler('click');
    expect(parentScope.bttClickSpy).toHaveBeenCalledWith('more', undefined);
  
  });

});

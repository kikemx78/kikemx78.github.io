import searchEntry from './search_entry.component';

describe('Search Entry Component', () => {
  
  let parentScope;
  let element;

  const findIn = (element, selector) => {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(angular.mock.module(searchEntry));

  beforeEach(inject(($compile, $rootScope) => {
    parentScope = $rootScope.$new();
    parentScope.bttClickSpy = jasmine.createSpy('bttClickSpy')

    element = angular.element(`<search-entry action-ctrl="bttClickSpy(e, mySearch)"/> `);
    $compile(element)(parentScope);
    parentScope.$digest();
  }));

  xit('invokes action with a param ', () => {
    const bttClickButton = findIn(element, '.search-button');
    bttClickButton.triggerHandler('click');
    expect(parentScope.bttClickSpy).toHaveBeenCalledWith('search', undefined);
  
  });

});
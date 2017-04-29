import searchMore from './search-more/search_more.component';
import searchEntry from './search-entry/search_entry.component';
import resultsGallery from './results-gallery/results_gallery.component';
import selectedItem from './selected-item/selected_item.component';

export const components = angular
  .module('components', [searchMore, searchEntry, resultsGallery, selectedItem])
  .name;
  
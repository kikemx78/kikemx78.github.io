import '../styl/style.styl';
import angular from 'angular';
import  SpotifyQuery  from './services/spotifyQuery.service';
import { misc } from './misc/misc.module';
import { components } from './components/components.module';
import { jumboCompAttrs, searchMoreAttrs, searchEntryAttrs } from './comp-attrs/comp_attrs';

import { openModal } from './misc/modal-new/helpers';

const rootComponent = {
  template: require('./app.html'),
  controller: class RootComponent {
    
    constructor(SpotifyQuery, $window) {
      'ngInject';

      this._SpotifyQuery = SpotifyQuery;
      this._$window = $window;

      this.jumboCompAttrs = jumboCompAttrs;
      this.searchMoreAttrs = searchMoreAttrs;
      this.searchEntryAttrs  =searchEntryAttrs;

      this.loadMe = false;
      this.als = { offset: 0, limit: 0, toShow: 0, filter: 0 };
      this.ars = { offset: 0, limit: 0, toShow: 0, filter: 0 };

      this.mySearch = '';

      this.queryResults = [];
      this.selected = {};

    }

    $onInit() {
      // console.log(this.queryResults[0])
    }

    showGallery(e, input) {
      
      this.loadMe = true;
      this.mySearch = input;
      
      if (e === 'search') {
        this.als.offset = 0;
        this.ars.offset = 0;
        this.als.limit = 12;
        this.ars.limit = 12;
      }

      if (this.mySearch === '') {
          openModal(this._$window);
          this.selected = {};
          this.selected.name = 'Please make a query!';
          this.loadMe = false;
          return null;
      }
    
      this._SpotifyQuery.getGallery(this.mySearch, e, this.ars.offset, this.als.offset, this.ars.limit, this.als.limit).then(

        (successResponse) => {

          let totalArtists = successResponse[0].data.artists.total;
          let totalAlbums = successResponse[1].data.albums.total;

          let artistsResults = successResponse[0].data.artists.items;
          let albumsResults = successResponse[1].data.albums.items;

          let toTotalArtists = totalArtists < 6 ? 6 - totalArtists : 0;
          let toTotalAlbums = totalAlbums < 6 ? 6 - totalAlbums : 0;

          if (totalArtists === 0 && totalAlbums === 0) {
            openModal(this._$window);
            this.selected = {};
            this.selected.name = 'Your query produced no results. Try again!';
            this.loadMe = false;
          }

          if ((totalArtists + totalAlbums) <= 12) {
            
            artistsResults = artistsResults.filter((item, i) => i <= (6 + toTotalAlbums));
            albumsResults = albumsResults.filter((item, i) => i <= (6 + toTotalArtists));
            

          } else {

            this.als.offset += 6;
            this.ars.offset += 6;

            this.als.toShow = totalAlbums - this.als.offset;
            this.ars.toShow = totalArtists - this.ars.offset;

            const bigger = totalArtists >= totalAlbums ? this.ars : this.als;
            const smaller = totalArtists <= totalAlbums ? this.ars : this.als;
            const smallerTotal = albumsResults.length <= artistsResults.length ? albumsResults.length : artistsResults.length;
            
            if (bigger.toShow < 6 && smaller.toShow >= 0) {
              bigger.limit = bigger.toShow;
              smaller.limit = smaller.limit + (6 - bigger.toShow);
              smaller.offset += 5 - bigger.toShow;
              
            } 

            if (smaller.toShow < 0) {
              bigger.limit = 12;
              bigger.offset += 5;
              bigger.filter = 11 - smallerTotal; 
              smaller.filter = smallerTotal;
            
            }

            if (smaller.toShow > 0 && bigger.toShow > 0) {
              smaller.filter = 5;
              bigger.filter = 5;
             
            }

            artistsResults = artistsResults.filter((item, i) => i <= this.ars.filter);
            albumsResults = albumsResults.filter((item, i) => i <= this.als.filter);

          }

          let combinedResults = albumsResults.concat(artistsResults);
          this.queryResults = combinedResults;
          this.loadMe = false;
          
        });

    }

    showModal(item, source, image) {
     
      this.selected.image = image;
      this.selected.source = source;
      this.selected.name = 'Loading...';
      this.selected.item = [];
      this.selected.years = [];
      this.loadMe = true;

      openModal(this._$window);
      // this.showItem = true;
      
      this._SpotifyQuery.getModal(item, source).then(
        (successResponse) => {

          if (source !== 'artist') {
            this.selected.name = successResponse.data.name;
            this.selected.item = successResponse.data.tracks.items;
            this.loadMe = false;
          } else {
            this.selected.item = successResponse.data.items;
            this.urls = successResponse.data.items.map((item, i) => item.href);
            this._SpotifyQuery.getYears(this.urls).then(
              (successResponse) => {
                this.selected.name = successResponse.map((item, i) => item.data.artists[0].name)[0];
                this.selected.years = successResponse.map((item, i) => item.data.release_date);
                this.loadMe = false;
              });
          }

        });
      }

  }
}

export const root = angular
  .module('root', [misc, components, SpotifyQuery])
  // .service('SpotifyQuery', SpotifyQuery)
  .component('root', rootComponent)
  .name;

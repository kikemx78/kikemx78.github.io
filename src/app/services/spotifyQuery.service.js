import angular from 'angular';

class SpotifyQuery {

  constructor($http, $q) {
    'ngInject';
    this._$http = $http;
    this._$q = $q;
  }

  getGallery(input, id, offsetAr, offsetAl, limitAr, limitAl) {
    const sParameter = encodeURIComponent(input.trim()).toLowerCase();
    const artistPromise = this._$http({method: 'GET', url: 'https://api.spotify.com/v1/search?q=' + sParameter + '&type=artist&offset=' + offsetAr + '&limit=' + limitAr });
    const albumPromise = this._$http({method: 'GET', url: 'https://api.spotify.com/v1/search?q=' + sParameter + '&type=album&offset=' + offsetAl + '&limit=' + limitAl });
    
    return this._$q.all([artistPromise, albumPromise]).then(
      (data) => {
        return data;
    });
    
  }

  getYears(url) {
    const val = url.map((item, i) => this._$http({method: 'GET', url: item}));
    this.loading = true;
    
    return this._$q.all(val).then(
      (data) => {
        return data;
      }
    )
  }

  getModal(item, source) {
    const url = source !== 'artist' ? 'https://api.spotify.com/v1/albums/' + item : 'https://api.spotify.com/v1/artists/' + item + '/albums';
    const selected = this._$http({ method: 'GET', url: url });
  
    return selected.then(
      (data) => {
        return data;
    });
  }

}

export default SpotifyQuery;
   
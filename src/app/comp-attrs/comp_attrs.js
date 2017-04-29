export const jumboCompAttrs = { 
  style: { 
    backgroundColor: '#CF4284', 
    color: '#fff', 
    image: 'hero-img@2x.png'
  }, 
  attrs: {
    rightText: 'Powered by Spotify', 
    leftImage: 'img/gl-logo@2x.png'
  }
};

export const searchEntryAttrs = {
  lgInput: { 
    attrs : { 
      placeholderText: 'Search for artist or album title' 
    } 
  }, 
  mdButton: { 
    attrs : { 
      id: 'search', 
      buttonText: 'SEARCH', 
      className: 'light-text'
    }, 
    style : { 
      backgroundColor: '#CF4284', 
      color: '#fff' 
    } 
  }    
};

export const searchMoreAttrs = {
  mdButton: { 
    attrs : { 
      id: 'more', 
      buttonText: 'SHOW ME MORE!', 
      className: 'light-text'
    }, 
    style : { 
      backgroundColor: '#CF4284', 
      color: '#fff' 
    } 
  }
  
};

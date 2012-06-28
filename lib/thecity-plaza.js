// **************************************************
// The City Plaza JavaScript API
// **************************************************
TheCityPlaza = {
  defaults : {'subdomain' : null,
              'page_to_load' : null,
              'thecity_domain' : 'onthecity.org'},
               
  _class_vars : {}, 
  
  load_page : function(subdomain, page_to_load, options) {
    this.defaults['subdomain'] = subdomain;
    this.defaults['page_to_load'] = page_to_load;
    
    if(this.defaults['subdomain'] == null) {
      alert('Subdomain must be set');
      return;
    } else {
      var thecity_domain = 'thecity_domain' in options ? options['thecity_domain'] : this.defaults['thecity_domain'];
      this._class_vars['topics_url']  = 'http://'+subdomain+'.'+thecity_domain+'/plaza/topics?format=json&callback=?';
      this._class_vars['events_url']  = 'http://'+subdomain+'.'+thecity_domain+'/plaza/events?format=json&callback=?';
      this._class_vars['prayers_url'] = 'http://'+subdomain+'.'+thecity_domain+'/plaza/prayers?format=json&callback=?';
      this._class_vars['needs_url']   = 'http://'+subdomain+'.'+thecity_domain+'/plaza/needs?format=json&callback=?';
      this._class_vars['albums_url']  = 'http://'+subdomain+'.'+thecity_domain+'/plaza/albums?format=json&callback=?';
    }
    
    if(this._class_vars[this.defaults['page_to_load']+'_url'] == null) {
      alert('Invalid default page');
      return;
    }

    if(options === undefined) { 
      options = this.defaults; 
    } else {
      $.extend(this.defaults, options)  
    }

    var self = this; // Need object scope at this point
    $.getJSON(this._class_vars[this.defaults['page_to_load']+'_url'], this.defaults, 
      function(data){ 
        if(self.defaults['page_to_load'] == 'topics') self._build_topics(data); 
        else if(self.defaults['page_to_load'] == 'events') self._build_events(data); 
        else if(self.defaults['page_to_load'] == 'prayers') self._build_prayers(data); 
        else if(self.defaults['page_to_load'] == 'needs') self._build_needs(data); 
        else if(self.defaults['page_to_load'] == 'albums') self._build_albums(data); 
      }
    )
  },

  
  _build_topics : function(topics) {    
    var data_array = []
    for(var i=0; i<topics.length; i++) {
      data_array.push( [topics[i]['global_topic']['title'], topics[i]['global_topic']['short_url']]);
    }
    var onthecity_start = document.getElementById('onthecity_start');
    onthecity_start.appendChild(this._build_unordered_list(data_array));
  },
  
  
  _build_events : function(events) {   
    var data_array = []
    for(var i=0; i<events.length; i++) {
      data_array.push( [events[i]['global_event']['title'], events[i]['global_event']['short_url']]);
    }
    var onthecity_start = document.getElementById('onthecity_start');
    onthecity_start.appendChild(this._build_unordered_list(data_array));
  },
  
  
  _build_prayers : function(prayers) {       
    var data_array = []
    for(var i=0; i<prayers.length; i++) {
      data_array.push( [prayers[i]['global_prayer']['title'], prayers[i]['global_prayer']['short_url']]);
    }
    var onthecity_start = document.getElementById('onthecity_start');
    onthecity_start.appendChild(this._build_unordered_list(data_array));
  },
  
  
  _build_needs : function(needs) {       
    var data_array = []
    for(var i=0; i<needs.length; i++) {
      data_array.push( [needs[i]['global_need']['title'], needs[i]['global_need']['short_url']]);
    }
    var onthecity_start = document.getElementById('onthecity_start');
    onthecity_start.appendChild(this._build_unordered_list(data_array));
  },
  
  
  _build_albums : function(albums) {       
    var data_array = []
    for(var i=0; i<albums.length; i++) {
      data_array.push( [albums[i]['global_album']['title'], albums[i]['global_album']['short_url']]);
    }
    var onthecity_start = document.getElementById('onthecity_start');
    onthecity_start.appendChild(this._build_unordered_list(data_array));
  },


  _build_link : function(text, link_to) {
    var link = document.createElement('a');
    link.setAttribute('href', link_to);
    link.innerHTML = text;
    return link;
  },


  _build_unordered_list: function(data_array) {
    var ulist = document.createElement('ul');
    ulist.setAttribute('class','otc-unordered-list')

    var size = data_array.length;
    for(var i = 0; i<size; i++) {
      var item = document.createElement('li');
      if(data_array[i][1] == null)
        item.appendChild( data_array[i][0] );
      else
        item.appendChild( this._build_link(data_array[i][0], data_array[i][1]) );

      ulist.appendChild(item);
    }
    
    return ulist;
  },

}

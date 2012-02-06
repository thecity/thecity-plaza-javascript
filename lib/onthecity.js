// **************************************************
// OnTheCity JavaScript API
// **************************************************
OnTheCity = {
  defaults : {'subdomain' : null,
              'page_to_load' : 'null'},
               
  _class_vars : {}, 
  
  load_page : function(subdomain, page_to_load, options) {
    this.defaults['subdomain'] = subdomain;
    this.defaults['page_to_load'] = page_to_load;
    
    if(this.defaults['subdomain'] == null) {
      alert('Subdomain must be set');
      return;
    } else {
      this._class_vars['topics_url']  = 'http://'+subdomain+'.onthecity.org/plaza/topics?format=json';
      this._class_vars['events_url']  = 'http://'+subdomain+'.onthecity.org/plaza/events?format=json';
      this._class_vars['prayers_url'] = 'http://'+subdomain+'.onthecity.org/plaza/prayers?format=json';
      this._class_vars['needs_url']   = 'http://'+subdomain+'.onthecity.org/plaza/needs?format=json';
      this._class_vars['albums_url']  = 'http://'+subdomain+'.onthecity.org/plaza/albums?format=json';
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

    
    // var self = this; // Need object scope at this point for jQuery.
    // $.getJSON(this._default_page_to_load, this.defaults,
    //   function(data){        
    //     //self._class_vars['group_attributes'] = [];
    //   }
    // );

    var self = this; // Need object scope at this point for jQuery.
    $.getJSON( this._class_vars[this.defaults['page_to_load']+'_url'], function(data) {
      alert(data);
      // var data_array = [];

      // $.each(data, function(key, val) {
      //   //data_array.push('<li id="' + key + '">' + val + '</li>');
      //   alert(key);
      // });

    });

    // var onthecity_start = document.getElementById('onthecity_start');
    // onthecity_start.appendChild(this._build_topics());
  },
  
  
  _build_topics : function() {    
    var data_array = [['CNN','http://www.cnn.com'], ['Wes Hays', 'http://www.weshays.com']];
    return this._build_unordered_list(data_array);
  },
  
  
  _build_events : function() {     
    alert('events');
  },
  
  
  _build_prayers : function() {       
    alert('prayers');
  },
  
  
  _build_needs : function() {       
    alert('needs');
  },
  
  
  _build_albums : function() {       
    alert('albums');
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

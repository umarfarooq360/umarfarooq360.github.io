var map; 
markers = {};
markerList = [];



//Create an instance of the map and initialize
function initialize() {
    var mapOptions = {
      center: { lat: 37.500, lng: -77.467},
      zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
        
   }

//Loading map when page finishes loading
google.maps.event.addDomListener(window, 'load', initialize);


//First we load the data from the file
var data;

var file = "data/geocoded.csv";


function createMarker(i, myLatlng){
    
    var Name = data.data[i].AccountName;
    var Phone = data.data[i].Phone;
    
    
    var contentString = '<div id="content">'+
          '<h1 id="firstHeading" class="firstHeading">'+
                Name
                +'</h1>'+
          '<div id="bodyContent">'+


          '<p>Website: '+ data.data[i].Website + '</p>'+
        '<p>Phone: '+Phone+ ' </p>'+
          '</div>'+
          '</div>';
     
    //create the marker
    var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: Name
      });
    
    //Adding additional parameters for filtering
    marker.area = data.data[i].GeographicArea;
    marker.menteeType = data.data[i].MenteeType;
    
    markerList.push(marker);
       //Create infowindow
            var infowindow = new google.maps.InfoWindow({
                position: myLatlng,
                content: contentString
                //,disableAutoPan : true
            });
    
     //add a listener to popup window
             google.maps.event.addListener(marker, 'click', function() {
                 
                 infowindow.open(map, marker);
                 infowindow.setPosition(myLatlng);
              });

}


/*
Read the data file and log the results
*/
Papa.parse(file, {
	download: true,
    header: true,
	complete: function(results) {
        data = results;
        
        console.log(data);
        
        //Iterate and plot
        for(var i=0; i< data.data.length ;i++){
            //get the lat lang from data
            var myLatlng =  new google.maps.LatLng(data.data[i].LATITUDE,
                                                    data.data[i].LONGITUDE);
            
           createMarker(i, myLatlng); 
        }
        
    }
});

/* 
    Given the field and the value, filter marker that match 
*/
function filterCtrl( field, value ){
    
    /*Filter by geographic location*/
    if(field == 'area'){
        $(markerList).each(function(id, marker) {
            
            //Hide all
            marker.setVisible(false);
            if(value == 'Any'){
                marker.setVisible(true);    
            }
            
            //Only show filtered ones
            else if(marker.area == value ){
                marker.setVisible(true);
            }
        });
        
    /*Filter by Mentee type*/    
    }else if(field == 'type'){
        $(markerList).each(function(id, marker) {
            
            //Hide all
            marker.setVisible(false);
            if(value == 'Any'){
                marker.setVisible(true);    
            }
            
            //Only show filtered ones
            else if(marker.menteeType.indexOf( value) >=0 ){
                marker.setVisible(true);
            }
        });
    }
}


$(function(){
  
    //Listener for geographic location filter
    $('#program-location').on('change', function(){
        filterCtrl('area', this.value);
    });
    
    //Listener for mentee type filter
    $('#program-type').on('change', function(){
        filterCtrl('type', this.value);
    });
    
    
});



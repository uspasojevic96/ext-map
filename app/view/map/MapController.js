Ext.define('Map.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window'
    ],

    config: {
        listen: {
            // The fireEvent() is coming from a component so we listen on the component event domain
            component: {
                // The component we are listening to is alias : map
                'map': {
                    // The fireEvent() from the map component
                    markerClick: function (marker) {
                        /*
                         * This will create and open a window with a zoomed in street map as well
                         * as open the WikiPedia page from the url on the marker
                         * */
                        Ext.create('Ext.window.Window', {
                            title: marker.title, // Marker title
                            height: 600,
                            width: 1000,
                            modal: true,
                            layout: 'border',
                            maximizable: true,
                            items: [
                                {
                                    xtype: 'gmappanel',
                                    region: 'west',
                                    split: true,
                                    width: 300,
                                    center: {
                                        lat: marker.lat, // Marker latitude
                                        lng: marker.lng // Marker longitude
                                    },
                                    mapOptions: {
                                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                                        zoom: 10
                                    }
                                },
                                {
                                    xtype: 'container',
                                    region: 'center',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'uxiframe',
                                            src: marker.url // Marker URL
                                        }
                                    ]
                                }
                            ]
                        }).show()
                    },

                    click: function(evt) {
                        console.log(evt);
                        var map = this.getView(),
                        marker = {
                            lat: evt.latLng.lat(),
                            lng: evt.latLng.lng(),
                            title: "Marrakesh",
                            url: 'https://en.wikipedia.org/wiki/Marrakesh',
                            animation: google.maps.Animation.DROP
                        };

                        var i = this.markers.length;
                        console.log(i);
                        if(i>0){
                        while(i) {
                            i--;

                            console.log(this.markers[i]);

                            this.markers[i].setMap(null);

                            console.log(this.markers[i]);
                        }
                        }
                        var d = map.addMarker(marker);
                        console.log(d);
                        this.markers.push(d);
                        //console.log(this.getView().markers);
                    }
                }
            }
        }
    },
    /*
    * The init method fires before the view is initialized and the markers are loaded from the store
    **/
    init: function () {
        var me = this,
            map = me.getView(), //Reference to map view
            store = map.getViewModel().getStore('Markers'), // Get the store from the ViewModel
            markers = [], // Create and empty markers array
            data;

            me.markers = [];
        // Load the store
        /*
        store.load(function (records) {
            // Iterate through each record
            Ext.each(records, function (record) {
                data = record.getData(); // Get the data object from each record
                me.markers.push(data); // Push the objects onto the markers array
            });
        });
        */
        //map.markers = me.markers;  // Set the markers config for the Map component to the markers array
        setTimeout(function() {
            google.maps.event.addListener(map.gmap, 'click', function(e) {
            map.fireEvent('click', e);
        });

            console.log(map.gmap);
        }, 5000);
        
},

    doSomething: function() {
        console.log('asdasd');
    }
});

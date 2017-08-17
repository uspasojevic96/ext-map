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
            component: {
                'map': {
                    markerClick: function (marker) {
                        Ext.create('Ext.window.Window', {
                            title: marker.title,
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
                                        lat: marker.lat,
                                        lng: marker.lng
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
                                            src: marker.url
                                        }
                                    ]
                                }
                            ]
                        }).show()
                    },

                    click: function(evt) {
                        var me = this,
                            map = me.getView(),
                        marker = {
                            lat: evt.latLng.lat(),
                            lng: evt.latLng.lng(),
                            title: "Marrakesh",
                            url: 'https://en.wikipedia.org/wiki/Marrakesh',
                            animation: google.maps.Animation.DROP
                        };

                        me.markers.push(map.addMarker(marker));
                    }
                }
            }
        }
    },

    init: function () {
        var me = this,
            map = me.getView();

            me.markers = [];

        setTimeout(function() {
            google.maps.event.addListener(map.gmap, 'click', function(e) {
                map.fireEvent('click', e);
            });
        }, 5000);
        
    }
});

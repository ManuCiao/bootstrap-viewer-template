import sync from 'ol-hashed'; // install package

(function () {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'Satellite',
                        type: 'base',
                        visible: false,
                        preload: Infinity,
                        source: new ol.source.BingMaps({
                            key: 'AuzXTgnihF-J1PX_F29Q9WGFEuhxpEqYlZDI99O2LPMHuAO0UCNoGcg9_sT0YQeI',
                            imagerySet: 'Aerial'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Image({
                        title: 'EEZ Boundaries',
                        source: new ol.source.ImageWMS({
                            params: {
                                'LAYERS': 'MarineRegions:eez_boundaries'
                            },
                            url: 'http://geo.vliz.be/geoserver/MarineRegions/wms?',
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Image({
                        title: "Blocks",
                        source: new ol.source.ImageWMS({
                            url: 'http://www.openpetro.com/geoserver/mapstand/wms?',
                            params: {
                                'LAYERS': 'mapstand:licenced_blocks'
                            },
                            serverType: 'geoserver'
                        })
                    }),
                ]
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([4.40, 53.00], 'EPSG:4326', 'EPSG:3857'),
            // <!-- extent: [0, 8000000, 1000000, 6700000], -->
            zoom: 6
        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Key' // Optional label for button
    });
    map.addControl(layerSwitcher);
})();

sync(map);
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import FileInput from "../FileInput/FileInput";
import "./MainPageContainer.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGFubW95bSIsImEiOiJja3N1YTFsem4wa2JhMnFsc3I1M3pmNW9lIn0.xB2fNbAujrVTlCB1yvPkGg";

interface Props {
  content: string;
}

const MainPageContainer: React.FC<Props> = ({
  content,
}): React.ReactElement => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);

  const [fileData, setFileData] = useState("");
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  console.log("file", fileData);
  // Initialize map when component mounts
  var test = [];

  const data = { location: { lat: 50.62914, lon: 5.61972 } };
  const updateMap = (d) => {
    // @ts-ignore
    data.forEach(function (d) {
      return {
        type: "Point",
        coordinates: [d.location.lon, d.location.lat],
      };
    });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    console.log("file000", fileData);

    map.on("load", () => {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  // feature for Mapbox DC
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-77.03238901390978, 38.913188059745586],
                  },
                  properties: {
                    title: "Mapbox DC",
                  },
                },
                {
                  // feature for Mapbox SF
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-122.414, 37.776],
                  },
                  properties: {
                    title: "Mapbox SF",
                  },
                },
              ],
            },
          });

          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    // Clean up on unmount
    return () => map.remove();
  }, [fileData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="root">
      <div className="file-loader">
        <FileInput
          fileData={fileData}
          setFileData={setFileData}
          content={"text"}
        ></FileInput>
      </div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MainPageContainer;

/* global google */
import React from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  Polyline,
} from 'react-google-maps';

class InfoMarker extends React.Component<InfoMarkerProps> {
  readonly state: InfoMarkerState = {
    showInfo: false,
  };
  render() {
    return (
      <Marker
        {...this.props}
        onClick={() => this.setState({ showInfo: !this.state.showInfo })}
      >
        {this.state.showInfo && this.props.info ? (
          <InfoWindow onCloseClick={() => this.setState({ showInfo: false })}>
            <div>{this.props.info}</div>
          </InfoWindow>
        ) : null}
      </Marker>
    );
  }
}
// InfoMarker.propTypes = {
//   info: PropTypes.string
// };

const parkingGarageIcon = '/images/icon-parking-garage.png';
const parkingPlaceIcon = '/images/icon-parking-space.png';

const places = {
  evh: {
    icon: parkingGarageIcon,
    position: { lat: 51.480308, lng: 11.9641 },
    info: 'Tiefgarage unter EVH',
  },
  entry: {
    icon: parkingGarageIcon,
    position: { lat: 51.480308, lng: 11.963413 },
    info: 'Einfahrt zu den Tiefgaragen',
  },
  haendelhalle: {
    icon: parkingGarageIcon,
    position: { lat: 51.481705, lng: 11.964253 },
    info: 'Tiefgarage unter Händelhalle',
  },
  hallmarkt: {
    icon: parkingGarageIcon,
    position: { lat: 51.4817, lng: 11.9656 },
    info: 'Tiefgarage Hallmarkt, REWE City',
  },
};

function createMarkers(places: Places, selectedLocation?: string) {
  const info = places.evh.icon;
  return Object.keys(places).map((key) => (
    <InfoMarker
      key={key}
      icon={places[key].icon}
      opacity={selectedLocation === null || key === selectedLocation ? 1 : 0.5}
      position={places[key].position}
      info={places[key].info}
    />
  ));
}

// function positionFactory(obj) {
//   return <Position>obj;
// }

function createLines(places: Places, selectedLocation: string) {
  const lines: Lines = {
    evh: [
      places.entry.position,
      { lat: 51.48034713420376, lng: 11.963668093085289 },
      { lat: 51.48035381594041, lng: 11.963829025626183 },
      places.evh.position,
    ],
    haendelhalle: [
      places.entry.position,
      { lat: 51.48083489840664, lng: 11.963550075888634 },
      { lat: 51.48137611011531, lng: 11.963850483298302 },
      places.haendelhalle.position,
    ],
    hallmarkt: [
      places.entry.position,
      { lat: 51.48083489840664, lng: 11.963550075888634 },
      { lat: 51.48137611011531, lng: 11.963850483298302 },
      places.hallmarkt.position,
    ],
  };
  return Object.keys(lines).map((key) => (
    <Polyline
      key={key}
      path={lines[key]}
      options={{
        strokeOpacity:
          selectedLocation === null || key === selectedLocation ? 1 : 0.5,
        strokeColor: '#003082',
        strokeWeight: 2,
        icons: [
          {
            icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
            offset: '100%',
          },
        ],
      }}
    />
  ));
}

const Map = withScriptjs(
  withGoogleMap(({ selectedLocation }: MapPropped) => (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 51.4811, lng: 11.9645 }}
      onClick={(ev) => {
        /* eslint no-console: 0 */
        console.log(`{ lat: ${ev.latLng.lat()}, lng: ${ev.latLng.lng()} }`);
      }}
    >
      {createLines(places, selectedLocation)}
      {createMarkers(places, selectedLocation)}
    </GoogleMap>
  ))
);

const MapPropped = (props: any) => (
  <Map
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDdbfN_GFY4b4IpKnGBH6L3jJWo2RXSQeU"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
);

export default MapPropped;

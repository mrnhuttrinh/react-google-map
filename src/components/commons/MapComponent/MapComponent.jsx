import React from "react"
import { compose, withProps } from "recompose";
import _ from 'lodash';
import { bind } from "decko";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from "react-google-maps";

import './MapComponent.scss';
import MapOverlay from '../MapOverlay/MapOverlay';

class MapComponent extends React.Component {

  state = {
    markerSelect: null,
    zoom: 8,
  }

  get markers() {
    const { points, hoverPoint } = this.props;
    return _.map(points, point => {
      if (hoverPoint) {
        if (hoverPoint.lat === point.lat && hoverPoint.lng === point.lng) {
          return (
            <Marker
              key={`${point.lat}_${point.lng}`}
              position={new window.google.maps.LatLng(point.lat, point.lng)}
              icon={require('./imgs/red-marker.PNG')}
              onClick={this.handleClickMarker(point)}
            />
          );
        }
      }
      return (
        <Marker
          key={`${point.lat}_${point.lng}`}
          position={new window.google.maps.LatLng(point.lat, point.lng)}
          icon={require('./imgs/car.PNG')}
          onClick={this.handleClickMarker(point)}
        />
      );
    });
  }

  get centerMarker() {
    const { markerSelect } = this.state;
    if (markerSelect) {
      return {
        lat: Number(markerSelect.lat),
        lng: Number(markerSelect.lng),
      };
    }
  }

  componentDidMount() {
    this.updateBounds();
  }

  componentDidUpdate(prevProps) {
    const { points } = this.props;
    // clear marker select
    if (_.difference(points, prevProps.points).length) {
      this.setState({
        markerSelect: null,
        zoom: 8,
      });

      this.updateBounds();
    }
  }

  render() {
    const { markerSelect } = this.state;
    return (
      <GoogleMap
        defaultZoom={this.state.zoom}
        zoom={this.state.zoom}
        defaultCenter={this.centerMarker}
        center={this.centerMarker}
        ref={mapView => { this.mapView = mapView; } }
      >
        {this.markers}
        {
          markerSelect && (
            <OverlayView
              position={this.centerMarker}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={this.getPixelPositionOffset}
            >
              <MapOverlay
                markerSelect={markerSelect}
                handleCloseClick={this.handleCloseClick}
              />
            </OverlayView>
          )
        }
      </GoogleMap>
    );
  }

  @bind
  handleCloseClick() {
    this.setState({
      markerSelect: null,
      zoom: 8,
    });
  }

  @bind
  handleClickMarker(point) {
    return (event) => {
      this.setState({
        markerSelect: point,
        zoom: 8,
      });

      // const bounds = new window.google.maps.LatLngBounds();
      // bounds.extend(new window.google.maps.LatLng(
      //   point.lat,
      //   point.lng
      // ));
      // if (this.mapView) {
      //   this.mapView.fitBounds(bounds);
      // }
    }
  }

  getPixelPositionOffset(width, height) {
    return {
      x: -(width / 2 + 5),
      y: -(height + 35),
    };
  }

  updateBounds() {
    // https://github.com/tomchentw/react-google-maps/issues/305
    const bounds = new window.google.maps.LatLngBounds();
    const { points } = this.props;
    _.forEach(points, point => {
      bounds.extend(new window.google.maps.LatLng(
        Number(point.lat),
        Number(point.lng)
      ));
    });
    if (this.mapView) {
      this.mapView.fitBounds(bounds);
    }
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8jIPrxjJfWPikViLal4uoPjtLGYHzvcE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapComponent);

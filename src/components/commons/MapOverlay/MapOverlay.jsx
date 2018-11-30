import React from 'react';
import block from 'bem-cn';

import './MapOverlay.scss';

const b = block('overlay-indicator');

const ENUM_TYPE = {
  "1": {
    text: "Moving",
  },
  "2": {
    text: "Out of Region",
  },
  "3": {
    text: "Office",
  },
  "4": {
    text: "Parked",
  },
  "5": {
    text: "Idling",
  }
}

class MapOverlay extends React.PureComponent {
  render() {
    const { markerSelect, handleCloseClick } = this.props;
    return (
      <div className="overlay-indicator">
        <a href="#" className="close" onClick={handleCloseClick} />
        <div className="content">
          <div className="id">
            {markerSelect.id}
          </div>
          <div className="name">
            <span>
              {markerSelect.name}
            </span>
            <span>
              (view driver's profile)
            </span>
          </div>
          <div className="short-time">
            <span>
              {markerSelect.short}
            </span>
            <span>
              {markerSelect.time}
            </span>
          </div>
          <div className="row-data location">
            <span>
              LOCATION
            </span>
            <span>
              {markerSelect.location}
            </span>
          </div>
          <div className="row-data status">
            <span>
              STATUS
            </span>
            <div>
              <span>{ENUM_TYPE[markerSelect.type].text}</span>
              <div>
                {markerSelect.detail}
              </div>
            </div>
          </div>
          <div className="row-data speed">
            <span>
              SPEED
            </span>
            <span>
              {markerSelect.speed} km/h
            </span>
          </div>
          <div className="row-data direction">
            <span>
              DIRECTION
            </span>
            <span>
              {markerSelect.direction}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MapOverlay;
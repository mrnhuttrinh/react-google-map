import React from 'react';
import block from 'bem-cn';
import { bindActionCreators } from 'redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { MapComponent } from '../commons';
import {
  selectedItemOnMapSelector,
  selectedHoverPointSelector,
} from '../../reducers/selectors';
import * as actions from '../../actions';

import './RightMap.scss';

const b = block('right-map');

class RightMap extends React.PureComponent {
  render() {
    const { itemOnMap, hoverPoint } = this.props;
    console.log(hoverPoint);
    return (
      <div className={b()}>
        <MapComponent
          points={itemOnMap}
          hoverPoint={hoverPoint}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemOnMap: selectedItemOnMapSelector(state),
    hoverPoint: selectedHoverPointSelector(state),
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RightMap);

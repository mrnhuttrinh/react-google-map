import React from 'react';
import block from 'bem-cn';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LeftSide from '../LeftSide/LeftSide';
import RightMap from '../RightMap/RightMap';
import * as actions from '../../actions';

import './MainBody.scss';

const b = block('main-body');

class MainBody extends React.PureComponent {

  componentDidMount() {
    const { getData } = this.props;
    getData();

    //
    const body = document.getElementsByTagName('body')[0];
    if (body && body.scrollHeight) {
      window.scrollTo(0, body.scrollHeight);
    }
  }

  render() {
    return (
      <div className={b()}>
        <LeftSide />
        <RightMap />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default compose(
  connect(null, mapDispatchToProps),
)(MainBody);
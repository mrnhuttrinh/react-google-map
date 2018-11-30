import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { bindActionCreators } from 'redux';
import { Table, Checkbox } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import uuid from 'uuid';

import Pagination from "react-js-pagination";
import { Pill } from '../commons';
import {
  selectedFiltersSelector,
  selectedDataSelector,
} from '../../reducers/selectors';
import * as actions from '../../actions';

import './LeftSide.scss';

const b = block('left-side');

const ENUM_TYPE_COLOR = {
  "1": {
    color: "#3abaa9",
    text: "Moving",
  },
  "2": {
    color: "#d77d4d",
    text: "Out of Region",
  },
  "3": {
    color: "#555555",
    text: "Office",
  },
  "4": {
    color: "#0071ca",
    text: "Parked",
  },
  "5": {
    color: "#3a33a7",
    text: "Idling",
  }
}

const itemsCountPerPage = 10;
const pageRangeDisplayed = 5;

class LeftSide extends React.PureComponent {
  state = {
    activePage: 1,
  }

  get itemPerRow() {
    const { geoData, filters } = this.props;
    const { activePage } = this.state;
    const from = (activePage - 1) * itemsCountPerPage;
    const to = activePage * itemsCountPerPage;

    if (_.includes(filters, 'all')) {
      return _.slice(geoData, from, to);
    }
    const filterData = [];
     _.map(geoData, geo => {
      if (_.includes(filters, geo.type)) {
        return filterData.push(geo);
      }
    })
    return _.slice(filterData, from, to);
  }

  get itemAllRow() {
    const { geoData, filters } = this.props;
    const { activePage } = this.state;

    if (_.includes(filters, 'all')) {
      return geoData;
    }
    const filterData = [];
     _.map(geoData, geo => {
      if (_.includes(filters, geo.type)) {
        return filterData.push(geo);
      }
    })
    return filterData;
  }

  componentDidUpdate(prevProps) {
    const {updateItemRenderToMap, filters} = this.props;
    updateItemRenderToMap(this.itemPerRow);

    if (_.difference(filters, prevProps.filters).length) {
      this.setState({
        activePage: 1,
      });
    }
  }

  renderPills() {
    const { geoData, filters } = this.props;
    return _.map(_.groupBy(geoData, 'type'), (geo, key) => (
      <Pill
        disabled={(!_.includes(filters, key) && !_.includes(filters, 'all'))}
        key={uuid()}
        color={ENUM_TYPE_COLOR[key].color}
        text={ENUM_TYPE_COLOR[key].text}
        value={geo.length}
        onClick={this.handlePillClick}
        name={key}
      />
    ));
  }
  renderTableBody() {
    return (
      <tbody>
        {
          _.map(this.itemPerRow, geo => (
            <tr
              key={uuid()}
              onMouseOver={this.handleMouseOver(geo)}
              onMouseOut={this.handleMouseOut}
            >
              <td className="td-name">{geo.name}</td>
              <td>{geo.id}</td>
            </tr>
            )
          )
        }
      </tbody>
    );
  }
  render() {
    const { geoData, filters } = this.props;
    return (
      <div className={b()}>
        <div className={b('filter')}>
          <div className={b('filter--checkbox_all')}>
            <Checkbox
              checked={_.includes(filters, 'all') || geoData.length === this.itemAllRow.length}
              onChange={this.handleCheckboxChange}
            >
              Show all {geoData.length} cars
            </Checkbox>
          </div>
          <div className={b('filter--pills')}>
            {this.renderPills()}
          </div>
        </div>
        <div className={b('table')}>
          <div className={b('table--content')}>
            <Table striped condensed hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>License Plate</th>
                </tr>
              </thead>
              {this.renderTableBody()}
            </Table>
          </div>
          <div className={b('table--pagination')}>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={this.itemAllRow.length || 0}
              pageRangeDisplayed={pageRangeDisplayed}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
      </div>
    );
  }

  @bind
  handleMouseOver(geo) {
    const {hoverRowData} = this.props;
    return () => {
      hoverRowData(geo)
    }
  }

  @bind
  handleMouseOut() {
    const {hoverRowData} = this.props;
    hoverRowData()
  }

  @bind
  handlePillClick(name, disabled) {
    const { filters, updateFilter } = this.props;
    const newFilters = [...filters];

    if (disabled) {
      newFilters.push(name);
    } else {
      _.remove(newFilters, value => value === name);
    }
    updateFilter(newFilters);
  }

  @bind
  handleCheckboxChange() {
    const { filters, updateFilter, geoData } = this.props;
    const newFilters = [...filters];
    if (_.includes(filters, 'all')) {
      _.remove(newFilters, value => value === 'all');
    } else {
      newFilters.unshift('all');
    }
    updateFilter(newFilters);
  }

  @bind
  handleOnChange(page) {
    this.setState({
      activePage: page,
    });
  }
}

const mapStateToProps = (state) => {
  return {
    geoData: selectedDataSelector(state),
    filters: selectedFiltersSelector(state),
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LeftSide);
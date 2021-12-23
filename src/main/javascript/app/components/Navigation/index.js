/**
 *
 * Navigation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Accordion, Menu, Icon, Search } from '*****-ui-components';
import history from 'utils/history';
import { version } from '../../../package.json';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: null,
      isLoading: false,
      results: [],
      value: '',
      searchData: null,
    };
  }

  componentDidMount() {
    this.renderSearchData();
  }

  componentWillMount() {
    this.resetSearch();
  }

  checkActiveItem = url => {
    const currentPath = `${window.location.pathname}/`.replace(/\//g, '');
    const linkUrl = (process.env.PUBLIC_PATH + url).replace(/\//g, '');
    return currentPath === linkUrl;
  };

  handleSubMenu = index => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  CreateSubMenuItems = data => {
    const subMenuItems = data.map(item => (
      <Menu.Item
        id={`navItem${item.id}`}
        key={item.key}
        as={Link}
        to={item.url}
        name={item.key}
        active={this.checkActiveItem(item.url)}
        data-testid={`navItem${item.id}`}>
        {item.icon && <Icon name={item.icon} />}
        <span>{item.title}</span>
      </Menu.Item>
    ));

    return subMenuItems;
  };

  CreateMenuItems = data => {
    const menuItems = data.map((item, index) => {
      if (item.child) {
        return (
          <Menu.Item id={`navItem${item.id}`} key={item.key} className="item-collapse" active={this.state.activeIndex === index}>
            <Accordion.Title
              id={`navTitle${item.id}`}
              active={this.state.activeIndex === index}
              index={index}
              onClick={() => this.handleSubMenu(index)}>
              {item.icon && <Icon name={item.icon} />}
              <span>{item.title}</span>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === index} content={this.CreateSubMenuItems(item.child)} />
          </Menu.Item>
        );
      }

      return (
        <Menu.Item
          id={`navItem${item.id}`}
          key={item.key}
          as={Link}
          to={item.url}
          name={item.key}
          active={this.checkActiveItem(item.url)}
          data-testid={`navItem${item.id}`}>
          {item.icon && <Icon name={item.icon} />}
          <span>{item.title}</span>
        </Menu.Item>
      );
    });

    return menuItems;
  };

  renderSearchData = () => {
    const { data } = this.props;
    if (!data) return;

    const searchData = [];

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].child) {
        for (let j = 0; j < data[i].child.length; j += 1) {
          searchData.push(data[i].child[j]);
          if (data[i].child[j].child) {
            for (let k = 0; k < data[i].child[j].child.length; k += 1) {
              searchData.push(data[i].child[j].child[k]);
            }
          }
        }
      } else {
        searchData.push(data[i]);
      }
    }

    this.setState({ searchData });
  };

  resetSearch = () => this.setState({ isLoading: false, results: [], value: '' });

  handleSearchResult = (e, { result }) => {
    this.setState({ value: result.title });

    this.resetSearch();

    if (e.key === 'Enter') {
      if (result.url !== window.location.pathname) {
        history.push(result.url);
      }
    }
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    if (this.state.value.length < 1) {
      return this.resetSearch();
    }

    const { searchData } = this.state;
    const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
    const isMatch = result => re.test(result.title);

    this.setState({
      isLoading: false,
      results: _.filter(searchData, isMatch),
    });

    return null;
  };

  searchResultRenderer = obj => (
    <Link to={obj.url}>
      {obj.icon && <Icon name={obj.icon} />}
      {obj.title}
    </Link>
  );

  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="navigation-search-mobile">
          <Icon name="search" />
        </div>

        <Search
          className="navigation-search"
          loading={this.state.isLoading}
          onResultSelect={this.handleSearchResult}
          onSearchChange={_.debounce(this.handleSearchChange)}
          results={this.state.results}
          value={this.state.value}
          resultRenderer={this.searchResultRenderer}
          noResultsMessage={this.props.searchNoResultsMessage}
          minCharacters={2}
          placeholder={this.props.searchPlaceholder}
        />

        <Accordion as={Menu} fluid vertical>
          {this.CreateMenuItems(data)}
        </Accordion>

        <div className="system-time">
          {moment().format('DD/MM/YYYY HH:mm:ss')}
          <span style={{ float: 'right' }}>{version}</span>
        </div>
      </React.Fragment>
    );
  }
}

Navigation.propTypes = {
  data: PropTypes.array,
  searchNoResultsMessage: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

export default Navigation;

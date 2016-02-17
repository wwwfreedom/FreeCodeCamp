import React, { Component, PropTypes } from 'react'
import sty from './SearchBar.scss'
import MdSearch from 'react-icons/lib/md/search'

export default class SearchBar extends Component {
  static propTypes = {
    searchInputSet: PropTypes.func.isRequired,
    fetchWikiIfNeeded: PropTypes.func.isRequired,
    searchInput: PropTypes.string.isRequired
  };

  state = {
    searchInput: this.props.searchInput || ''
  };

  render() {
    return (
      <div className={sty.container}>
        <input
          type="text"
          value={this.state.searchInput}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeyPress}
          ref='search'
        />
        <button onClick={this.handleButtonPress}>
          <MdSearch />
        </button>
      </div>
    )
  }

  handleInputChange = (e) => {
    this.setState({searchInput: e.target.value})
  };

  handleInputBlur = (e) => {
    this.props.searchInputSet(e.target.value)
    setTimeout(function() {
      this.setState({searchInput: ''})
    }.bind(this), 5000)
  };

  handleButtonPress = (e) => {
    this.props.fetchWikiIfNeeded()
  };

  handleKeyPress = (e) => {
    // lesson: using refs and force blur()
    if (e.keyCode === 13) {
      this.refs.search.blur()
      this.props.fetchWikiIfNeeded()
    }
  }
}

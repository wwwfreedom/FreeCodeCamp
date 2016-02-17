import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as wikipediaActions } from 'redux/modules/Wikipedia/Wikipedia.js'
import SearchBar from 'components/SearchBar/SearchBar'
import sty from './Wikipedia.scss'

const mapStateToProps = (state) => ({
  searchInput: state.wikipedia.searchInput
})

export default class Wikipedia extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    searchInput: PropTypes.string,
    fetchWikiIfNeeded: PropTypes.func.isRequired,
    searchInputSet: PropTypes.func.isRequired
  };

  render() {
    const {searchInput, fetchWikiIfNeeded, searchInputSet} = this.props
    return (
      <div className={sty.container}>
        <h1>Wikipedia Search</h1>
        <SearchBar
          searchInput={searchInput}
          searchInputSet={searchInputSet}
          fetchWikiIfNeeded={fetchWikiIfNeeded}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, wikipediaActions)(Wikipedia)

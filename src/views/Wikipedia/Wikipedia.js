import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as wikipediaActions } from 'redux/modules/Wikipedia/Wikipedia.js'
import SearchBar from 'components/SearchBar/SearchBar'
import sty from './Wikipedia.scss'
import Loader from 'halogen/PulseLoader'

const mapStateToProps = (state) => ({
  searchInput: state.wikipedia.searchInput,
  isFetching: state.wikipedia.isFetching,
  articles: state.wikipedia.articles
})

export default class Wikipedia extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    searchInput: PropTypes.string,
    fetchWikiIfNeeded: PropTypes.func.isRequired,
    searchInputSet: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {searchInput, fetchWikiIfNeeded, searchInputSet, isFetching} = this.props
    return (
      <div className={sty.container}>
        <h1>Wikipedia Search</h1>
        <SearchBar
          searchInput={searchInput}
          searchInputSet={searchInputSet}
          fetchWikiIfNeeded={fetchWikiIfNeeded}
        />
        {isFetching ? <Loader color="#D3D3D3" size="32px" margin="4px" /> : ''}
      </div>
    )
  }
}

export default connect(mapStateToProps, wikipediaActions)(Wikipedia)

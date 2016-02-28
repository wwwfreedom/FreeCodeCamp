import { isEmpty } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as wikipediaActions } from 'redux/modules/Wikipedia/Wikipedia.js'
import SearchBar from 'components/SearchBar/SearchBar'
import sty from './Wikipedia.scss'
import Loader from 'halogen/PulseLoader'
import Cards from 'components/Cards/Cards'
import Button from 'components/Button/Button'

const mapStateToProps = (state) => ({
  searchInput: state.wikipedia.searchInput,
  isFetching: state.wikipedia.isFetching,
  articles: state.wikipedia.articles
})

export default class Wikipedia extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    searchInput: PropTypes.string,
    fetchWikiIfNeeded: PropTypes.func.isRequired,
    searchInputSet: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {searchInput, fetchWikiIfNeeded, searchInputSet, isFetching, articles} = this.props
    return (
      <div className={sty.container}>
        <h1>Simple English Wikipedia Search</h1>
        <Button
          text={'get random article'}
          href='http://simple.wikipedia.org/wiki/Special:Random'
          target='_blank'
        />
        <SearchBar
          searchInput={searchInput}
          searchInputSet={searchInputSet}
          fetchWikiIfNeeded={fetchWikiIfNeeded}
        />
        {isFetching ? <Loader color="#D3D3D3" size="32px" margin="20px" /> : ''}
        {isEmpty(articles)
          ? <div></div>
          : <Cards articles={articles} />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, wikipediaActions)(Wikipedia)

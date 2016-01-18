import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { actions as QuoteViewActions } from '../../../src/redux/modules/QuoteView.js'
import sty from './QuoteView.scss'

const mapStateToProps = (state) => ({
  quote: state.QuoteView.quote
})

export class QuoteView extends Component {
  static propTypes = {
    quote: PropTypes.object.isRequired,
    quoteGetNoDupes: PropTypes.func.isRequired
  }

  render () {
    const { quoteGetNoDupes, quote } = this.props
    return (
      <div className={sty.container}>
        <button onClick={quoteGetNoDupes}>click</button>
        {quote.author}
        {quote.text}
      </div>
    )
  }
}

export default connect(mapStateToProps, QuoteViewActions)(QuoteView)

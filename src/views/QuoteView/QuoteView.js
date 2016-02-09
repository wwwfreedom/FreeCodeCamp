import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { actions as QuoteViewActions } from 'redux/modules/QuoteView.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import sty from './QuoteView.scss'
import transitions from './transitions.scss'

const mapStateToProps = (state) => ({
  quote: state.QuoteView.quote
})

export class QuoteView extends Component {
  static propTypes = {
    quote: PropTypes.object.isRequired,
    quoteGetNoDupes: PropTypes.func.isRequired
  };

  render () {
    const { quoteGetNoDupes, quote } = this.props
    return (
      <div className={sty.container}>
        <div className={sty.intro}>
          <h2>Funny Quote Generator</h2>
        </div>
        <div className={sty.uiInput}>
          <a
            className={sty.paperRaise}
            onClick={quoteGetNoDupes}
          >
          More quotes
          </a>
          <a
            target='_blank'
            href={`https://twitter.com/intent/tweet?text=${quote.text}`}
            className={sty.paperRaise}>
            Tweet this quote
          </a>
        </div>
        <div className={sty.quoteContent}>
          <ReactCSSTransitionGroup
            transitionName={transitions}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={200}
            >
            <div>
              <p>"{quote.text}"</p>
              <p className={sty.author}>-{quote.author}.</p>
            </div>
          </ReactCSSTransitionGroup>
        </div>
        <div className={sty.quoteImage}>
          <ReactCSSTransitionGroup
            transitionName={transitions}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}
            >
              {this.renderImage(quote['image-src'], quote.text)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }

  renderImage = (image, text) => {
    // strip image links of spaces
    var imageNoSpace = image.replace(/ +/g, "")
    // use regex and return the image if it's available
    let re = new RegExp('xphoto-unavailable')
    if (re.test(imageNoSpace) === false) {
      return <img key={text} src={imageNoSpace}/>
    } else {
      return <div className={sty.fillerDiv}></div>
    }
  };
}

export default connect(mapStateToProps, QuoteViewActions)(QuoteView)
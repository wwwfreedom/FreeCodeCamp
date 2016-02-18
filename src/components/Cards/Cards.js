import React, { Component, PropTypes } from 'react'
import Card from 'components/Card/Card'
import sty from './Cards.scss'

export default class Cards extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }
  render() {
    const {articles} = this.props
    return (
      <div className={sty.container}>
        {articles.map((item, index) => {
          return <Card
            key={index}
            item={item}
          />
        })}
      </div>
    )
  }
}

// ToAsk: for some reason if I do this then I get weird error about source being undefine. I suspect the api call didn't finish inTime before render

// export default class Cards extends Component {
//   static propTypes = {
//     articles: PropTypes.array.isRequired
//   }
//   render() {
//     const {articles} = this.props
//     return (
//       <div className={sty.container}>
//         {articles.map((item, index) => {
//           return <Card
//             key={index}
//             item={item}
//             image={item.thumbnail.source}
//             title={item.title}
//             text={item.extract}
//           />
//         })}
//       </div>
//     )
//   }
// }
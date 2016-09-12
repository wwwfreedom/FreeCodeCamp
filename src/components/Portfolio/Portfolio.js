import { includes } from 'lodash'
import sty from './Portfolio.scss'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

export default function Portfolio ({portfolio}) {
  return (
    <div className={sty.container}>
      <h2>Featured Projects</h2>
      {renderContent(portfolio)}
    </div>
  )
}

function renderContent (portfolio) {
  return (
    <div className={sty.innerContainer}>
      {portfolio.map((item, index) =>
        <div className={sty.content} key={index}>
          <div className={sty.text}>
            <h3>{item.title}</h3>
            <h4>Project brief</h4>
            <p>
              {item.brief}
            </p>
            <h4>My role</h4>
            <p>
              {item.role}
            </p>
            {renderLinks(item)}
          </div>
          <div className={sty.image}>
            <div className={sty.imageHeader}>
              <span></span>
              <span></span>
            </div>
            <img src={item.image} alt={item.title}/>
          </div>
        </div>
      )}
    </div>
  )
}

function renderLinks (item) {
  // lesson: includes() es6 string method is awesome
  // test doesn't like includes so I'll implement lodash solution
  if (includes(item.link, 'http:') || includes(item.link, 'https:')) {
    return (
      <RaisedButton
        href={item.link}
        label='View Project'
        target='_blank'
        className={sty.projectButton}
      />
    )
  } else {
    return (
      <Link
        to={`/${item.link}`}
      >
        <RaisedButton label='View Project' className={sty.projectButton} />
      </Link>
    )
  }
}

// lesson: remember if want to [] notation of accessing object for more complex query of dynamic properties
Portfolio.propTypes = {
  portfolio: React.PropTypes.array.isRequired
}

import sty from './Portfolio.scss'

export default function Portfolio ({portfolio}) {
  return (
    <div className={sty.container}>
      <h2>Featured Work</h2>
      {renderContent(portfolio)}
    </div>
  )
}

function renderContent (portfolio) {
  return (
    <div className={sty.innerContainer}>
      {portfolio.map((item, index) =>
        <div className={sty.content} key={index}>
          <div className={sty[`image${index + 1}`]}>
            <div className={sty.imageHeader}>
              <span></span>
              <span></span>
            </div>
            <img src={item.image} alt={item.title}/>
          </div>
          <div className={sty.text}>
            <div className={sty.title}><h3>{item.title}</h3></div>
            <div className={sty.introText}><h4>{item.introText}</h4></div>
            <div className={sty.separator}>
              <div className={sty.lineSeparator}>∎</div>
            </div>
            <div className={sty.description}><p>{item.description}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}

// remember if want to [] notation of accessing object for more complex query of dynamic properties
Portfolio.propTypes = {
  portfolio: React.PropTypes.array.isRequired
}
import sty from './Portfolio.scss'

export default function Portfolio ({portfolio}) {
  return (
    <div className={sty.container}>
     {renderContent()}
    </div>
  )
}

function renderContent (portfolio) {
  return (
    <div className={sty.content}>
      <div>test</div>
    </div>
  )
}

Portfolio.propTypes = {
  portfolio: React.PropTypes.array.isRequired
}
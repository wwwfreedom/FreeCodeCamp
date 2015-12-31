import sty from './MenuButton.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(sty)

export default function MenuButton(props) {
  let className = cx({
    menuText: true,
    menuTextAnimate: props.navStatus
  })
  let barStatus = cx({
    bar: true,
    barActive: props.navStatus,
    barClosing: !props.navStatus
  })
  return (
    <div className={sty.container}>
      <div className={sty.clickRegion} onClick={props.onClick}>
        <span className={barStatus}></span>
        <span className={barStatus}></span>
        <span className={barStatus}></span>
      </div>
      <div className={className}>Menu</div>
    </div>
  )
}

MenuButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  navStatus: React.PropTypes.bool.isRequired
}

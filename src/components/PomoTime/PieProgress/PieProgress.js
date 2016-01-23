import React, { PropTypes } from 'react'
import sty from './PieProgress.scss'

export default function PieProgress ({diameter, strokeWidth, progress}) {
  let radius = (diameter - (2 * strokeWidth)) / 2
  let circumference = 2 * Math.PI * radius
  let offset = (1 - progress) * circumference
  let cx = diameter / 2
  let cy = diameter / 2
  let style = {
    // the styling that draws the offset in the svg
    strokeDashoffset: offset,
    transform: 'rotate(0.1deg)' // to fix Firefox
  }
  return (
    <div className={sty.radialProgress}>
      <svg
        width={diameter}
        height={diameter}
        style={{transform: 'rotate(270deg)'}}
      >
        <circle
          className={sty.radialProgressBackGround}
          cx={cx}
          cy={cy}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
        />
        <circle
          className={sty.radialProgressBar}
          cx={cx}
          cy={cy}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={style}
        />
      </svg>
    </div>
  )
}

PieProgress.propTypes = {
  diameter: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired
}

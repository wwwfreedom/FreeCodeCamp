import React, { PropTypes } from 'react'
import sty from './InfoPanel.scss'
import PieProgress from 'components/PomoTime/PieProgress/PieProgress'

export default function InfoPanel ({timer, stats, goals}) {
  let currentRound = stats.workCompleted % 4 === 0 ? 1 : stats.workCompleted % 4
  let roundProgress = handleRoundProgress(timer.status, stats.workCompleted)
  return (
    <div className={sty.container}>
      <div className={sty.rowWrap}>
        <div className={sty.setting}>
          <div className={sty.header}><h4>Round</h4></div>
          <div className={sty.content}>
            <div className={sty.number}>
              <span className={sty.firstNumber}>{currentRound}</span>
              <span>/4</span>
            </div>
            <PieProgress
              diameter={100}
              strokeWidth={5}
              progress={roundProgress}
            />
          </div>
        </div>

        <div className={sty.setting}>
          <div className={sty.header}><h4>Goal</h4></div>
          <div className={sty.content}>
            <div className={sty.number}>
              <span className={sty.firstNumber}>{stats.workCompleted}</span>
              <span>/{goals.daily}</span>
            </div>
            <PieProgress
              diameter={100}
              strokeWidth={5}
              progress={stats.workCompleted / goals.daily}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function handleRoundProgress (timerStatus, workCompleted) {
  // using modulo to make sure get the current round never exceed 4 and that the default is always 1 as the minimum
  var currentRound = workCompleted % 4
  // only show increase in progress when timer is active and pomodoro completed is greater than 0
  if (timerStatus === 'notActive' && workCompleted === 0) {
    return 0
  } else {
    return currentRound / 4
  }
}

InfoPanel.propTypes = {
  timer: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
}

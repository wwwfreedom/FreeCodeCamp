import React, { Component, PropTypes } from 'react'
import sty from './Twitch.scss'
import ButtonGroup from 'components/ButtonGroup/ButtonGroup'
import UserCard from 'components/UserCard/UserCard'

export default class Twitch extends Component {
  static propTypes = {
    streamers: PropTypes.array.isRequired
  };

  state = {
    value: 'all'
  };
  render() {
    return (
      <div className={sty.container}>
        <h1>Twitch Streamers</h1>
        <ButtonGroup
        value={this.state.value}
        buttons={[
          {value: 'all', content: 'All'},
          {value: 'online', content: 'Online'},
          {value: 'offline', content: 'Offline'}
        ]}
        onChange={this.handleChange}
        />
        <div className={sty.listWrap}>
          <UserCard />
        </div>
      </div>
    )
  }

  handleChange = (value) => {
    console.log(value)
    this.setState({value})
  }
}

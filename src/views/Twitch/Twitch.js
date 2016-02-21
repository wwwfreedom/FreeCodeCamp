import React, { Component, PropTypes } from 'react'
import {isEmpty} from 'lodash'
import { connect } from 'react-redux'
import { actions as twitchActions } from 'redux/modules/Twitch/Twitch.js'
import sty from './Twitch.scss'
import ButtonGroup from 'components/ButtonGroup/ButtonGroup'
import UserCard from 'components/UserCard/UserCard'

const mapStateToProps = (state) => ({
  streamersDetails: state.Twitch.streamersDetails,
  isFetching: state.Twitch.isFetching
})

export default class Twitch extends Component {
  static propTypes = {
    streamersDetails: PropTypes.array.isRequired,
    fetchTwitchIfNeeded: PropTypes.func.isRequired
  };

  state = {
    value: 'all'
  };
  render() {
    const {streamersDetails} = this.props
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
          {streamersDetails.map((user, index) => {
            return <UserCard
              image={isEmpty(user.logo) ? 'http://dummyimage.com/60x60/ecf0e7/5c5457.jpg&text=0x3F' : user.logo}
              link={isEmpty(user.url) ? null : user.url}
              statusText={user.status}
              userName={user.display_name}
              status={user.userStatus}
              key={index}
            />
          })
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchTwitchIfNeeded()
  }

  handleChange = (value) => {
    console.log(value)
    this.setState({value})
  }

}

export default connect(mapStateToProps, twitchActions)(Twitch)

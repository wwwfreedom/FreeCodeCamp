import {isEmpty} from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as twitchActions } from 'redux/modules/Twitch/Twitch.js'
import sty from './Twitch.scss'
import ButtonGroup from 'components/ButtonGroup/ButtonGroup'
import UserCard from 'components/UserCard/UserCard'
import Loader from 'halogen/PulseLoader'

const mapStateToProps = (state) => ({
  streamersDetails: state.Twitch.streamersDetails,
  isFetching: state.Twitch.isFetching
})

// condition to filter the twitch user array putting it here because this doesen't get rerun every time the react render if this were put under react render function.
const TWITCH_FILTERS = {
  All: () => true,
  Online: user => user.userStatus === 'Online',
  Offline: user => user.userStatus === 'Offline'
}

class Twitch extends Component {
  static propTypes = {
    streamersDetails: PropTypes.array.isRequired,
    fetchTwitchIfNeeded: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  state = {
    filter: 'All'
  };

  render() {
    const {streamersDetails, isFetching} = this.props
    const { filter } = this.state
    // filtering the array of user base on the filter set
    const filteredTwitchUsers = streamersDetails.filter(TWITCH_FILTERS[filter])
    return (
      <div className={sty.container}>
        <h1>Twitch Streamers</h1>
        <ButtonGroup
          value={this.state.filter}
          buttons={[
            {value: 'All', content: 'All'},
            {value: 'Online', content: 'Online'},
            {value: 'Offline', content: 'Offline'}
          ]}
          onChange={this.handleChange}
        />
        {isFetching
          ? <Loader color="#D3D3D3" size="32px" margin="20px" />
          : <div className={sty.listWrap}>
            {filteredTwitchUsers.map((user, index) => {
              return <UserCard
                image={isEmpty(user.logo) ? 'http://dummyimage.com/60x60/ecf0e7/5c5457.jpg&text=0x3F' : user.logo}
                link={user.url}
                statusText={user.status}
                userName={user.display_name}
                status={user.userStatus}
                key={index}
              />
            })
            }
          </div>
        }
      </div>
    )
  }

  // fetch twitch api on component mount
  componentDidMount() {
    this.props.fetchTwitchIfNeeded()
  }

  handleChange = (filter) => {
    this.setState({filter})
  }

}

export default connect(mapStateToProps, twitchActions)(Twitch)

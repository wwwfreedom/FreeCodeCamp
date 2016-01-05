import { generalUi, sidebarActivate } from '../../src/redux/modules/generalUi.js'
// const store = createStore(counter)
describe('(Redux) generalUi reducer', function () {
  it('reducer should return the right state', function () {
    expect(generalUi({
      sideBarStatus: false,
      menuLinks: []
    }, {type: 'SIDEBAR_ACTIVATE'})).to.deep.equal({
      sideBarStatus: true,
      menuLinks: []
    })

    expect(generalUi({
      sideBarStatus: true,
      menuLinks: []
    }, {type: 'SIDEBAR_ACTIVATE'})).to.deep.equal({
      sideBarStatus: false,
      menuLinks: []
    })

    // test for default case
    expect(generalUi({
      sideBarStatus: true,
      menuLinks: []
    }, {type: 'asdfsad'})).to.deep.equal({
      sideBarStatus: true,
      menuLinks: []
    })
  })
})

describe('(Redux) generalUi actions', function () {
  it('should create an action to activate the sideBar with no payload', function () {
    expect(sidebarActivate()).to.deep.equal({
      type: 'SIDEBAR_ACTIVATE',
      payload: undefined
    })
  })
})


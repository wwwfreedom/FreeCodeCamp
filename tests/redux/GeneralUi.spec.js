import sideBarStatus from '../../src/redux/modules/generalUi.js'

// const store = createStore(counter)
describe('(Redux) sideBarStatus reducer', function () {
  it('reducer should return the right state', function () {
    expect(sideBarStatus(false, {type: 'SIDEBAR_ACTIVATE'})).to.equal(true)
    expect(sideBarStatus(true, {type: 'SIDEBAR_ACTIVATE'})).to.equal(false)
    expect(sideBarStatus(true, {type: 'dadfas'})).to.equal(true)
  })
})


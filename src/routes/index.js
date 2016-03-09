import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import AboutView from 'views/AboutView'
import ContactView from 'views/ContactView'
import QuoteView from 'views/QuoteView/QuoteView'
import PomoTime from 'views/PomoTime/PomoTime'
import Calculator from 'views/Calculator/Calculator'
import Weather from 'views/Weather/Weather'
import Twitch from 'views/Twitch/Twitch'
import Wikipedia from 'views/Wikipedia/Wikipedia'
import Portfolio from 'views/Portfolio/Portfolio'
import TicTacToe from 'views/TicTacToe/TicTacToe'
import SimonGame from 'views/SimonGame/SimonGame'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/contact' component={ContactView} />
    <Route path='/quoteGenerator' component={QuoteView} />
    <Route path='/pomotime' component={PomoTime} />
    <Route path='/Wikipedia' component={Wikipedia} />
    <Route path='/Twitch' component={Twitch} />
    <Route path='/Weather' component={Weather} />
    <Route path='/Calculator' component={Calculator} />
    <Route path='/SimonGame' component={SimonGame} />
    <Route path='/TicTacToe' component={TicTacToe} />
    <Route path='/Portfolio' component={Portfolio} />
  </Route>
)

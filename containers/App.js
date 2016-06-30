import React, {Component, PropTypes} from 'react'
import Menulist from '../containers/layout/Menu'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="yh-layout">
                <div id="yh-nav">
                    <span className="logo">ewell</span>
                </div>
                <div id="yh-main">
                    {this.props.children}
                </div>
                <div id="aside">
                    <Menulist />
                </div>
            </div>
        )
    }
}
export default App;
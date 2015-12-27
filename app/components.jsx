import React from 'react'
import { Provider, connect } from 'react-redux'
import creators from './creators'
import DevTools from '../dev/devtools.jsx'
const createClass = React.createClass

const Node = createClass({
  getStyle: function() {
    return {
      left: this.props.d.get('x') - this.props.d.get('w') / 2,
      top: this.props.d.get('y') - this.props.d.get('h') / 2
    }
  },
  shouldComponentUpdate: function(next_props) {
    return !next_props.d.equals(this.props.d);
  },
  componentDidMount: function() {
    const w = this.refs.div.offsetWidth;
    const h = this.refs.div.offsetHeight;
    const x = this.refs.div.offsetLeft + w / 2;
    const y = this.refs.div.offsetTop + h / 2;
    this.props.initNode(this.props.id, x, y, w, h);
  },
  render: function() {
    return (
      <div className='node' style={this.getStyle()} ref='div'>
        {this.props.d.get('name')}
      </div>
    );
  }
});

const Container = createClass({
  shouldComponentUpdate: function(next_props) {
    return !next_props.data.equals(this.props.data);
  },
  componentDidMount: function() {
    if (this.props.doLayout !== undefined) this.props.doLayout();
  },
  render: function() {
    return (
      <div id={this.props.id} className='container' ref='div'>
        {
          this.props.data.map((d, id) => {
            return (
              <Node key={id} id={id} d={d} initNode={this.props.initNode} />
            )
          }).toArray()
        }
      </div>
    );
  }
});

const App = connect(
  function(state) {
    return {
      environment: state.get('environment'),
      chain: state.get('chain'),
      infrastructure: state.get('infrastructure')
    };
  },
  function(dispatch) {
    return {
      initNode: (id, x, y, w, h) =>
        dispatch(creators.initNode(id, x, y, w, h)),
      layoutChain: () => dispatch(creators.layoutChain())
    }
  }
)(createClass({
  render: function() {
    return (
      <div id='chart' style={{height: `${window.innerHeight}px`}}>
        <Container
          id='environment'
          data={this.props.environment}
          initNode={this.props.initNode}
        />
        <Container
          id='chain'
          data={this.props.chain}
          initNode={this.props.initNode}
          doLayout={this.props.layoutChain}
        />
        <Container
          id='infrastructure'
          data={this.props.infrastructure}
          initNode={this.props.initNode}
        />
      </div>
    );
  }
}));

export const Root = createClass({
  render: function() {
    const devtools = process.env.NODE_ENV === 'development' ?
      <DevTools /> :
      null;
    return (
      <Provider store={this.props.store}>
        <div><App />{devtools}</div>
      </Provider>
    );
  }
});

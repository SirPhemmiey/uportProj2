import React, { Component } from 'react';
import web3 from '../../util/web3v1';
import contractInstance from '../../util/contractSetup'
import decodeAddr from '../../util/decodeMNIDAddr'
import AddChildren from './addChildren'
import AddTask from './AddTask'
import ViewTask from './ViewTask';

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props  
    this.state = {
      person: ""
    }
  }

  componentWillMount() {
    let sender = decodeAddr(this.props.authData.address)
    web3.eth.defaultAccount = sender;
    this.setState({person: sender})
  }

  render() {
    
        return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Hi {this.props.authData.name}!</strong></p>
            <ViewTask contractInstance= {contractInstance} person={this.state.person}/>
            <AddChildren contractInstance= {contractInstance} /> 
            <AddTask contractInstance= {contractInstance}/>               
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard

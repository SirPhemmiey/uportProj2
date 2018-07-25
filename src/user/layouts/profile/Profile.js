import React, { Component } from 'react'
import web3 from '../../../util/web3v1';
import decodeAddr from '../../../util/decodeMNIDAddr'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    console.log(web3.version)
    this.state = {
      personAddr: "",
      balance: null
    }
  }

  componentWillMount() {
    let person = decodeAddr(this.props.authData.address)
    this.setState({personAddr: person})
    web3.eth.getBalance(person, (err, bal) => {
       this.setState({ balance: web3.utils.fromWei(bal) })
    })   
  }

  render() {
    
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Change these details in UPort to see them reflected here.</p>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>
            <p>
              <strong>Ethereum Address</strong><br />
              {this.state.personAddr}
            </p>
            <p>
              <strong>Rinkeby Eth balance </strong><br />
              {this.state.balance}
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile



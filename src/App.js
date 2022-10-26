import React from 'react';

import './App.css';
const ethers = require('ethers');

class App extends React.Component {
    provider;

    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    async startPayment() {
        try {
            const query = new URLSearchParams(window.location.search);

            const addr = query.get('to');
            const amount = query.get('amount');
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(amount)
            });
            console.log(tx)
        } catch (err) {
            console.error(err)
        }
    };

    async componentDidMount() {
        if(window.ethereum){
            const r = await window.ethereum.request({method:'eth_requestAccounts'})
            this.setState({
                address: r
            })

            this.startPayment()
        } else {
            alert("install metamask extension!!")
        }
    }

    render() {
        return (
            <div className="App">
                <p>CONNECTED ADDRESS: {this.state.address}</p>
            </div>

        );
    }
}

export default App;

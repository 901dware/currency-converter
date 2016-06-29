//ModalComponent.js
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const CurrencyType = ['USD', 'EUR', 'SEK'];

const swapStyle = {
  marginTop: '35px',
};

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            modal: false,
            convertFrom: 'USD',
            convertTo :'EUR',
            convertFromAmount: 0,
            convertToAmount:0
          };

    this.toggle = this.toggle.bind(this);
    this.handleClickSwap = this.handleClickSwap.bind(this);
    this.handleClickConvert = this.handleClickConvert.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFromAmount = this.handleChangeFromAmount.bind(this);
    this.handleChangeToAmount = this.handleChangeToAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    const { convertFrom, convertTo, convertFromAmount } = this.state;
    var convertToAmount;
    axios.get(`https://api.exchangeratesapi.io/latest`)
      .then(res => {
        console.log(res.data);
        var ratefrom, rateto;
        if( convertFrom === 'EUR'){
          ratefrom = 1;
        }
        else {
          ratefrom = res.data.rates[convertFrom];
        }

        if( convertTo === 'EUR'){
          rateto = 1;
        }
        else {
          rateto = res.data.rates[convertTo];
        }

        convertToAmount = convertFromAmount * rateto / ratefrom;
        console.log(ratefrom, rateto, convertToAmount);
        this.setState({convertToAmount: convertToAmount});
      })
  }

  handleChangeFrom(event) {
    var str = event.target.value.toUpperCase();
    if(str.length >= 3 ){
      if ( CurrencyType.indexOf(str) < 0 ){
        this.setState({convertFrom: ""});
        return;
      }    
    }
    this.setState({convertFrom: str});
  }
  
  handleChangeTo(event) {
    var str = event.target.value.toUpperCase();
    if(str.length >= 3 ){
      if ( CurrencyType.indexOf(str) < 0 ){
        this.setState({convertTo: ""});
        return;
      }    
    }    
    this.setState({convertTo: str});
  }

  handleChangeFromAmount(event) {
    this.setState({convertFromAmount: event.target.value});  
  }
  
  handleChangeToAmount(event) {
    this.setState({convertToAmount: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
     }


  render() {
    return (

        <div>
        <Button color="success" onClick={this.toggle}>Currency Converter</Button>

        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>React Currency Converter</ModalHeader>
          <ModalBody>
          <div className="row">            
            <div className="form-group col-md-4">
              <label>CONVERT FROM:</label>
              <input type="text" value={this.state.convertFrom} onChange={this.handleChangeFrom} className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label>CONVERT TO:</label>
              <input type="text" value={this.state.convertTo} onChange={this.handleChangeTo} className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <div className="form-group col-md-4"><Button color="primary" onClick={this.handleClickSwap} style={swapStyle}>SWAP</Button></div>
            </div>
            
          </div>

          <div className="row">             
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <input type="number" value={this.state.convertFromAmount} onChange={this.handleChangeFromAmount} className="form-control" />
              </div>
              <div className="form-group col-md-4">
                <input type="number" value={this.state.convertToAmount} onChange={this.handleChangeToAmount} className="form-control" />
              </div> 
              <div className="form-group col-md-4">
                <div className="row">
                  <div className="form-group col-md-4"><Button onClick={this.handleClickConvert} color="info">CONVERT</Button></div>
                </div>
              </div>
                         
          </div>
          </ModalBody>
          <ModalFooter>         
            <Button color="danger" onClick={this.toggle}>Exit</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}


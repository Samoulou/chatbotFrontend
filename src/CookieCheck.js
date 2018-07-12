import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const search = {
  value: null,
  trigger:'search'
}
const save = {
  value: null,
  trigger:'save'
}

class CookieCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
  }

  nextStep(){
    if(cookies.get('chatmee-save')){
      this.props.getCheck = true;
    }
    else {
      console.log('save');
      this.props.getCheck = false;
    }
    this.props.triggerNextStep();
  }

  render() {
    return (
      <div>
        {this.nextStep()}
      </div>
    );
  }
}

export default CookieCheck;

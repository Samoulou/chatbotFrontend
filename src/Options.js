import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
var step =
{
  id: 'options',
  options: [
    { value: true, label: "J'accepte", trigger: 'getOption' },
    { value: false, label: 'Je refuse', trigger: 'getOption' },
  ],
}

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {

  }


  render() {
    return (
      <div>
      {step}
      </div>
    );
  }
}

export default Options;

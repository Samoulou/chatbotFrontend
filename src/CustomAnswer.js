import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';
import config from './config/config.js';

const cookies = new Cookies();

class CustomAnswer extends Component {

  //Constructor containing our different states
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      type: '',
      lastIntent: '',
      url: ''
    };
  }
  //prepare our props and state for the first rendering
  componentWillMount() {
    const self = this;
    const {steps} = this.props;
    const search = steps.search.value;
    const options = steps.search
    const endpoint = encodeURI(config.ENDPOINT);
    var headers = new Headers();
    var message = {
      "message": search,
      "savingState": cookies.get('chatmee-save'),
      "conversationUid": cookies.get('chatmee-uid')
    };
    // Tell the server we want JSON back
    headers.set('Content-Type', 'application/json');
    var fetchOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(message)
    };

    //our promise fetch from the api endpoint
    var responsePromise = fetch(endpoint, fetchOptions);
    //Use the response and convert the response into JSON-JS object.
    responsePromise.then(function(response) {
      return response.json();
    }).then(function(jsonData) {
      self.setState({
        result: jsonData.answer,
        type: jsonData.type,
        lastIntent: jsonData.name,
        url: jsonData.url
      })
      self.props.triggerNextStep();
    });
  }

  //function that will hide the chat in order to open bookmee
  hideChatbot() {
    var elements = document.getElementsByClassName('jiqPmN');
    var frame = document.getElementById('tcf-widget-iframe');
    elements[0].style.display = "none";
    frame.style.display = "block";
  }

  //Rendering our answer with the right html semantic
  renderAnswer() {
    var answer;
    if (this.state.type === 'text') {
      if (this.state.lastIntent === "unknown_entity") {
        answer = <div>
          <div>{this.state.result}</div>
          <div><br/><br/>
            <a href="#" onClick={() => this.hideChatbot()}>ou parler à un expert</a>
          </div>
        </div>;
      } else {
        answer = <div>{this.state.result}</div>;
      }
    } else if (this.state.type === 'url') {
      answer = <a href={this.state.url} target="_blank">{this.state.result}</a>
    }
    return answer;
  }
  render() {
    return (<div>
      {this.renderAnswer()}
    </div>);
  }
}
export default CustomAnswer;

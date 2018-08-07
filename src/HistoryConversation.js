import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';
import config from './config/config.js';
const cookies = new Cookies();

class HistoryConversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conversation: null
    };
  }

  generateId() {
    return 'TCF-' + Math.random().toString(36).substring(2.5);
  }

  componentWillMount() {
    const self = this;
    if (!cookies.get('chatmee-uid')) {
      cookies.set('chatmee-uid', self.generateId());
      cookies.set('chatmee-save', true);
    } else {
      const nextStep = {
        value: null,
        trigger: 'options'
      }
      const {steps} = this.props;
      const convId = cookies.get('chatmee-uid');
      const endpoint = encodeURI(config.ENDPOINT + convId);
      var headers = new Headers();
      var conversation;
      headers.set('Content-Type', 'application/json');
      var fetchOptions = {
        method: 'GET',
        headers,
        body: JSON.stringify(conversation)
      };

      var responsePromise = fetch(endpoint, fetchOptions);
      //Use the response and Convert the response into JSON-JS object.
      responsePromise.then(function(response) {
        return response.json();
      }).then(function(jsonData) {
        self.setState({conversation: jsonData})
      });
    }
  }

  //Render the lasts questions asked
  renderConversation() {
    if (this.state.conversation) {
      var table = [];
      for (var i = 0; i < this.state.conversation.messages.length; i++) {
        table.push(<tr>
          <td>{this.state.conversation.messages[i].message}</td>
        </tr>);
      }
      return table;
    } else {
      return null;
    }
  }
  render() {
    return (<div>
      <h3>Voici vos dernières questions</h3>
      <table>
        <tbody>
          {this.renderConversation()}
        </tbody>
      </table>
    </div>);
  }
}

export default HistoryConversation;

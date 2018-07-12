import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';
import CustomAnswer from './CustomAnswer';
import GetOption from './getOption';
import CookieCheck from './CookieCheck';
import HistoryConversation from './HistoryConversation';
const theme = {
   backgroundImage: 'url("https://www.bookmee.ch/45cf21b9ee27587b7ea6a87fc033f899.svg")',
   fontFamily: '“Helvetica Neue”,Helvetica,Arial,sans-serif!important',
   headerBgColor: '#5e9df1',
   headerFontColor: '#fff',
   headerFontSize: '15px',
   botBubbleColor: '#5e9df1',
   botFontColor: '#fff',
   userBubbleColor: '#fff',
   userFontColor: 'rgb(110, 122, 137)',

};

var steps = [
  {
    id: '0',
    component: <HistoryConversation /> ,
    // asMessage: true,
    trigger: '1',
  },
  {
    id: '1',
    message: "Bonjour, je suis Chatmee, l'assistant virtuel de [CompanyName]. Avez-vous des questions sur les documents à nous fournir pour votre déclaration d’impôts, nos tarifs, les dates butoirs de cette année ?",
    trigger: 'save',
  },
  {
    id: 'CookieCheck',
    component: <CookieCheck getCheck={this.onChildChanged}/>,
    asMessage: true,
    waitAction: true,
    trigger: 'search',
  },
  {
    id: 'save',
    message: "En utilisant Chatmee, vous autorisez The Computer Firm à garder une trace de vos message.",
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: true, label: "J'accepte", trigger: 'getOption' },
      { value: false, label: 'Je refuse', trigger: 'getOption' },
    ],
  },
  {
    id: 'search',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    component: <CustomAnswer />,
    asMessage: true,
    waitAction: true,
    trigger: 'search',
  },
  {
    id: 'getOption',
    component: <GetOption />,
    asMessage: true,
    waitAction: true,
    trigger: 'search',
  },
  // {
  //   id: 'options',
  //   options: [
  //     { value: 'marie', label: 'Je suis marié', trigger: '3' },
  //     { value: 'celibataire', label: 'Je suis célibataire', trigger: '3' },
  //   ],
  // },
]
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trigger: 'save',
      current: '',
    };
  }


  onChildChanged  = (newState) => {
    this.setState({
      current: newState,
    });
    console.log(this.state.current);
  }


  renderSteps = () => {
    return (
    <ChatBot
      headerTitle={"Chatmee - v1.0"}
      // recognitionEnable={true}
      botAvatar={"http://bookmee.thecomputerfirm.com/img/favicon.png"}
      hideUserAvatar={true}
      steps={steps}
    />
  )
}
  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.renderSteps()}
      </ThemeProvider>
    )
  }
}

export default App;

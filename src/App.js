import {Component} from 'react'
import './App.css'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {
  Background,
  TriggerImage,
  ModalBackground,
  TriggerButton,
  TitleContainer,
  DisplayImage,
  ImagesContainer,
  Font,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {score: 0, remarks: '', loading: true, player: '', opponent: ''}

  registerId = event => {
    const number = Math.floor(Math.random() * 3 + 0)
    const updatedChoicesList = choicesList.filter(
      each => each.imageUrl === event.target.src,
    )
    const sourceId = updatedChoicesList[0].id
    const opponentsourceId = choicesList[number].id

    this.setState({loading: false})

    if (sourceId === 'PAPER' && opponentsourceId === 'ROCK') {
      this.setState(
        {
          remarks: 'YOU WON',
          player: updatedChoicesList[0].imageUrl,
          opponent: choicesList[number].imageUrl,
        },
        this.renderScore,
      )
    } else if (sourceId === 'ROCK' && opponentsourceId === 'SCISSORS') {
      this.setState(
        {
          remarks: 'YOU WON',
          player: updatedChoicesList[0].imageUrl,
          opponent: choicesList[number].imageUrl,
        },
        this.renderScore,
      )
    } else if (sourceId === 'SCISSORS' && opponentsourceId === 'PAPER') {
      this.setState(
        {
          remarks: 'YOU WON',
          player: updatedChoicesList[0].imageUrl,
          opponent: choicesList[number].imageUrl,
        },
        this.renderScore,
      )
    } else if (sourceId === opponentsourceId) {
      this.setState(
        {
          remarks: 'IT IS DRAW',
          player: updatedChoicesList[0].imageUrl,
          opponent: choicesList[number].imageUrl,
        },
        this.renderScore,
      )
    } else {
      this.setState(
        {
          remarks: 'YOU LOSE',
          player: updatedChoicesList[0].imageUrl,
          opponent: choicesList[number].imageUrl,
        },
        this.renderScore,
      )
    }
  }

  renderScore = () => {
    const {remarks} = this.state
    this.setState(prevState => {
      switch (remarks) {
        case 'YOU WON':
          return {score: prevState.score + 1}
        case 'YOU LOSE':
          return {score: prevState.score - 1}
        default:
          return null
      }
    })
  }

  renderChoicesList = () => (
    <div>
      <button type="button" onClick={this.registerId}>
        <DisplayImage
          src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png"
          alt="ROCK"
          data-testid="rockButton"
        />
      </button>
      <button type="button" onClick={this.registerId}>
        <DisplayImage
          src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png"
          alt="PAPER"
          data-testid="paperButton"
        />
      </button>
      <button type="button" onClick={this.registerId}>
        <DisplayImage
          src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png"
          alt="SCISSORS"
          data-testid="scissorsButton"
        />
      </button>
    </div>
  )

  changeLoading = () => {
    this.setState({loading: true})
  }

  render() {
    const {score, remarks, player, opponent, loading} = this.state
    return (
      <Background>
        <TitleContainer>
          <div>
            <h1>Rock Paper Scissors</h1>
          </div>
          <div>
            <p>Score</p>
            <Font>{score}</Font>
          </div>
        </TitleContainer>
        <ImagesContainer>
          {loading ? (
            this.renderChoicesList()
          ) : (
            <div>
              <h1>You</h1>
              <img src={player} alt="your choice" className="displayImage" />
              <h1>Opponent</h1>
              <DisplayImage src={opponent} alt="opponent choice" />
              <p>{remarks}</p>
              <button type="button" onClick={this.changeLoading}>
                PLAY AGAIN
              </button>
            </div>
          )}
        </ImagesContainer>
        <Popup
          modal
          trigger={<TriggerButton type="button">Rules</TriggerButton>}
          className="popup"
        >
          {close => (
            <>
              <ModalBackground>
                <RiCloseLine className="icon" onClick={() => close()} />
                <TriggerImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </ModalBackground>
            </>
          )}
        </Popup>
      </Background>
    )
  }
}

export default App

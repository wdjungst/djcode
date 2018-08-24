import React, { Component, Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import { Divider } from 'semantic-ui-react'
import { Flex } from './styles'

const colorChange = keyframes`
  from {
    color: black;
  }

  to {
    color: lightblue; 
  }
`

const BigLetter = styled.span`
  font-size: ${ props => props.size || '9rem' };
  font-face: ${ props => props.fontFace ? props.fontFace : '' };
  color: white;
`

const CodeSection = styled.div`
`

const Container = styled.div`
  padding-top: 50px;
  height: 70vh;
  background-color: #000;
`

const Canvas = styled.canvas`
  width: ${ props => props.expanded ? '250px' : '1px' };
  transition: width 1s linear;
`

const SpinBox = styled.div`
  width: 250px;
  font-size: 6rem;
  animation: ${colorChange} 4s linear infinite;
  animation-delay: 3.8s;
`

class Name extends Component {
  componentDidMount() {
    this.start()
  }

  start = () => {
    const { fontText } = this.props
    const ctx = document.querySelector(`#${fontText}`).getContext("2d")
    let dashLen = 60
    let dashOffset = dashLen
    let speed = 4
    let txt = fontText
		let x = 20
    let i = 0
    ctx.font = "100px Arizonia";
    ctx.lineWidth = 1;
	  ctx.lineJoin = "round";
    ctx.globalAlpha = .7;
    ctx.strokeStyle = ctx.fillStyle = "#FFF";

    (function loop() {
          ctx.clearRect(x, 0, 60, 100);
          ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
          dashOffset -= speed;
          ctx.strokeText(txt[i], x, 70);
          if (dashOffset > 0) requestAnimationFrame(loop);
          else {
            ctx.fillText(txt[i], x, 70);
            dashOffset = dashLen;
            x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
            if (i < txt.length) requestAnimationFrame(loop);
          }
        })();
  }

  render()  { 
    return null
  }
}

class Home extends Component {
  state = { 
    expanded: false,
    start: false,
    words: [
      'speak',
      'write',
      'teach',
      'learn',
    ],
    word: ''
  }

  componentDidMount() {
    setTimeout( () => this.setState({ expanded: true }), 1000 )
    setTimeout( () => this.setState({ start: true }), 2000 )
    this.interval = setInterval( this.changeWord, 4000 )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  changeWord = () => {
    const { words, word } = this.state
    let index = words.findIndex( w => w === word)
    if (index >= 0) {
      if (index === words.length - 1)
        index = 0
      else
        index++
    } else {
     index = 0 
    }

    this.setState({ word: words[index] })
  }

  render() {
    const { expanded, start, word } = this.state

    return (
      <Container>
        <Flex height="50%" justifyContent="center" alignItems="center" >
          <BigLetter className="name-animate">D</BigLetter>
          <Canvas className="name-animate" expanded={expanded} id="avid" height="150"></Canvas>
          <BigLetter className="name-animate">J</BigLetter>
          <Canvas className="name-animate" expanded={expanded} id="ungst" height="150"></Canvas>
          { start && 
            <Fragment>
              <Name fontText="avid" />
              <Name fontText="ungst" />
            </Fragment>
          }
        </Flex>
        <CodeSection>
          <Flex justifyContent="center">
            <SpinBox>{word}</SpinBox>
            <BigLetter fontFace="Roboto" size="6.5rem">CODE</BigLetter>
          </Flex>
        </CodeSection>
      </Container>
    );
  }
}

export default Home;

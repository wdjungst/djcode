import React, { Component, Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import { SocialIcon }  from 'react-social-icons'
import { Flex } from './styles'
import { Link } from 'react-router-dom'
import bg from '../images/bg.jpg'

const mediaQuery = (block) => (
  `@media only screen
     and (min-device-width: 400px)
     and (max-device-width: 667px)
     and (-webkit-min-device-pixel-ratio: 2)
     and (orientation: portrait) {
       ${block}
   }`
)

const colorChange = keyframes`
  from {
    color: #000; 
  }

  to {
    color: #ADD8E6;
  }
`

const animateText = keyframes`
  0% {
    margin-bottom: 0px;
    margin-right: 0px;
    margin-top: 0px;
    text-shadow: none;
    display: none;
  }

  40% {
    text-shadow: none;
  }

  100% {
    margin-bottom: 100px;
    margin-right: 70px;
    margin-top: -125px;
    text-shadow: 40px 12px 12px lightgrey;
  }
`

const ButtonLink = styled(Link)`
  color: #ADD8E6;
  padding: 30px 50px;
  border: solid 6px #ADD8E6;
  font-size: 3rem;
  text-align: center;
  box-shadow: 0px 0px 40px 2px #323232;
  min-width: 295px;
  text-decoration: none;
  &:hover {
    color: white !important;
    box-shadow: none;
  }
  
  ${ mediaQuery(
      `font-size: 1rem; 
       width: 100%; 
       border-width: 1px;
       box-shadow: none;
       padding: 15px;
      `
    ) 
  }
`

const Icons = styled.div`
  position: absolute;
  bottom: 20vh;
  ${ mediaQuery(
      `bottom: 0
       width: 100%;
       text-align: center;
       margin: 5px 10px;
      `
    ) 
  }
`

const BigLetter = styled.span`
  font-size: ${ props => props.size || '12rem' };
  font-face: ${ props => props.fontFace ? props.fontFace : '' };
  color: white;
`

const CodeSection = styled.div`
  * {
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: portrait) {
        font-size: 4rem;
    }
  }
`

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  background: url(${bg}) no-repeat center center;
  background-color: rgba(0,0,0,0.9);
  background-blend-mode: overlay;
  opacity: 1.8;
  ${ mediaQuery('height: 100vh;') }
`

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
  background-color: #666666; 
  background-image: linear-gradient(to bottom right, #7f7f7f, #323232);
  ${ mediaQuery('display: none;') }
`

const Canvas = styled.canvas`
  width: ${ props => props.expanded ? '250px' : '1px' };
  transition: width 1s linear;
  ${ mediaQuery('display: none') }
`

const SpinBox = styled.div`
  width: 250px;
  font-size: 6rem;
  animation: ${colorChange} 4s linear infinite;
  animation-delay: 3.7s;
  text-align: right;
  ${ mediaQuery('font-size: 4rem;') }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Word = styled.div`
  font-size: 5rem;
  color: #ADD8E6;
  animation: ${animateText} 2s linear;
  animation-fill-mode: forwards;
`

class Name extends Component {
  componentDidMount() {
    this.start() }

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
    ctx.globalAlpha = .6;
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
    word: '',
    expandWords: false,
  }

  words = [
    'speak',
    'write',
    'read',
    'teach',
    'learn',
  ]

  componentDidMount() {
    setTimeout( () => this.setState({ expanded: true }), 1000 )
    setTimeout( () => this.setState({ start: true }), 2000 )
    this.interval = setInterval( this.changeWord, 4000 )
  }

  componentWillUnmount() {
    this.clearInt()
  }

  clearInt = () => {
    clearInterval(this.interval)
  }

  changeWord = () => {
    const { state: { word }, words } = this
    let index = words.findIndex( w => w === word)
    if (index >= 0) {
      if (index === words.length - 1) {
        const mq = window.matchMedia( "(max-width: 630px)" );
       if (mq.matches) {
         this.setState({ word: words[0] })
         return
       } else {
          this.setState({ word: '', expandWords: true }, () => {
            this.clearInt()
          })

          return
       }
       } else {
        index++
       }
    } else {
     index = 0 
    }

    this.setState({ word: words[index] })
  }

  expand = () => {
    return (
      <List>
        { this.words.map( word => <Word>{word}</Word> ) }
      </List>
    )
  }

  render() {
    const { expanded, start, word, expandWords } = this.state
    const urls = [
      'https://github.com/wdjungst',
      'https://twitter.com/djungst',
      'https://www.linkedin.com/in/davejungst/'
    ]

    const links = [
      { url: '/', text: '<Learn />' },
      { url: '/', text: '<OSS />' },
      { url: '/', text: '<Speak />' },
      { url: '/', text: '<Built />' },
    ]

    return (
      <Fragment>
        <Container>
          <Flex height="50%" justifyContent="center" alignItems="center">
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
              { expandWords ? this.expand() : <SpinBox>{word}</SpinBox> }
              <BigLetter fontFace="Roboto" size="6.5rem">CODE</BigLetter>
            </Flex>
          </CodeSection>
            <Flex 
              alignItems="center"
              justifyContent="flex-end"
            >
              <Icons>
                { urls.map( link => { 
                  return <SocialIcon key={link} style={{ margin: '5px', height: 100, width: 100}} url={link} />
                  })
                }
              </Icons>
            </Flex>
        </Container>
        <Footer>
          { links.map( link => <ButtonLink key={link.text} to={link.url}>{link.text}</ButtonLink> ) }
        </Footer>
      </Fragment>
    );
  }
}

export default Home;

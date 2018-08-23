import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components'
import { Flex } from './styles'

const BigLetter = styled.span`
  font-size: 9rem;
  color: white;
`

const Container = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  background-color: #000;
`

const Canvas = styled.canvas`
  width: ${ props => props.expanded ? '250px' : '0px' };
  transition: width 1s linear;
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
  }

  componentDidMount() {
    setTimeout( () => this.setState({ expanded: true }), 1000 )
    setTimeout( () => this.setState({ start: true }), 2000 )
  }

  render() {
    const { expanded, start } = this.state

    return (
      <Container>
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
      </Container>
    );
  }
}

export default Home;

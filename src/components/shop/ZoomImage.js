import { Component } from "react";
import styled from "styled-components";

const Figure = styled.figure`
    width: 600px;
    background-repeat: no-repeat;
    &:hover img {
        opacity: 0;
    }
`;

// const ZoomImage = () => {
//     return (
//         <Figure onMouseMove={this.handleMouseMove} style={this.state}>
//             <img src="http://localhost:3000/file/61761833a78b931fac859b9c8b5d14622152b3c027110a896c3666e9"  className="block w-full pointer-events-none"/>
//         </Figure>
//     )
//   }


// const src = 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'
  
class ZoomImage extends Component {
    state = {
    //   backgroundImage: `url(${src})`,
      backgroundPosition: '0% 0%',
      src: 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'
    }

    
  
    handleMouseMove = e => {
      const { left, top, width, height } = e.target.getBoundingClientRect()
      console.log(left + " " + top + " " + width + " " + height);
      const x = (e.pageX - left) / parseInt(width, 10) * 100
      const y = (e.pageY - top) / parseInt(width, 10) * 100

        console.log(`x`, x);
        console.log(`y`, y)

      this.setState({ backgroundPosition: `${x}% ${y}%`, backgroundImage: `url(${this.state.src})` })
    //   this.setState({ backgroundPosition: `100% 50%` })
    }

    handleMouseLeave = () => {
      this.setState({backgroundImage: '' })
    }
  
    render = () =>
      <Figure onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} style={this.state}>
        <img src={this.state.src} className="block w-1/2 h-1/2 pointer-events-none" />
      </Figure>
}
  
export default ZoomImage
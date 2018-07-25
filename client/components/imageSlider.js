
import React, { Component } from 'react';

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(img/${image}.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  }
  return <div className="slide" style={styles}></div>
}

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image1: "",
      image2: "",
      image3: "",
      image4: "",

    }
  }


  render() {
    return (
      <div className="slider">

      </div>
    );
  }
}
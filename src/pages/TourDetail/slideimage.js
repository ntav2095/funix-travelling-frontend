import React from "react";
import ReactDOM from "react-dom";
import { Card } from "semantic-ui-react";
import "./slide.css";

export default class SlideImage extends React.Component {
  constructor(props) {
    super(props);

    /*
     * State slideIndex dùng để xác định xem slide nào đang được active.
     * Các ảnh sẽ được xếp chồng lên nhau, cái nào active thì hiển thị,
     * Cái nào không active thì ẩn đi.
     */
    this.state = {
      slideIndex: 0,
    };

    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.setSlideIndex = this.setSlideIndex.bind(this);
    this.getNewSlideIndex = this.getNewSlideIndex.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.runAutomatic = this.runAutomatic.bind(this);

    // this.updateDimensions = this.updateDimensions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  getNewSlideIndex(step) {
    const slideIndex = this.state.slideIndex;
    const numberSlide = this.props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  }

  // Quay về ảnh phía trước, tức index giảm 1 => step = -1
  backward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(-1),
    });
  }

  // Tiến tới ảnh phía sau, tức index tăng 1 => step = 1
  forward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  }

  // Xác định slideIndex nào sẽ được active
  setSlideIndex(index) {
    this.setState({
      slideIndex: index,
    });
  }

  updateDimensions() {
    this.containerElm.style.height = `${
      this.containerElm.offsetWidth / this.ratioWH
    }px`;
  }

  runAutomatic() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  }

  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.modalElm = this.rootElm.querySelectorAll(".modalslide");
    this.containerElm = this.rootElm.querySelector(".containe");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  showModal(index) {
    this.modalElm[index].style.display = "block";
  }

  hideModal(index) {
    this.modalElm[index].style.display = "none";
  }

  render() {
    return (
      <div className="lp-slideshow">
        <div className="containe">
          {this.props.input.map((image, index) => {
            return (
              <div
                key={index}
                className={`slide ${
                  this.state.slideIndex === index ? "active" : ""
                }`}
              >
                <div className="number-text">
                  {`${index + 1} / ${this.props.input.length}`}
                </div>
                <img
                  className="imageslide"
                  // src={image.src}
                  // alt={image.caption}
                  src={image}
                  alt="hehe"
                  onClick={() => {
                    this.showModal(this.state.slideIndex);
                  }}
                />
                <div className="lp-modal-image">
                  <div
                    id={`${index}`}
                    className="modalslide"
                    onClick={() => this.hideModal(this.state.slideIndex)}
                  >
                    <span
                      className="close"
                      onClick={() => this.hideModal(this.state.slideIndex)}
                    >
                      ×
                    </span>
                    <img
                      className="modal-conten"
                      // src={image.src}
                      // alt={image.caption + " modal"}
                      src={image}
                      alt="hehe modal"
                    />
                    {/* <span className="prev" onClick={this.backward}>
                      ❮
                    </span>
                    <span className="next" onClick={this.forward}>
                      ❯
                    </span> */}
                  </div>
                </div>
              </div>
            );
          })}

          <span className="prev" onClick={this.backward}>
            ❮
          </span>
          <span className="next" onClick={this.forward}>
            ❯
          </span>
        </div>

        <div className="dot-container">
          {this.props.input.map((image, index) => {
            return (
              <Card
                key={index}
                className={`dot ${
                  this.state.slideIndex === index ? "active" : ""
                }`}
                onClick={() => this.setSlideIndex(index)}
              >
                <img
                  className="image-small"
                  // src={image.src}
                  // alt={image.caption}
                  src={image}
                  alt="hehe"
                />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

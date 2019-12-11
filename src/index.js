import React, { Component } from "react";
import ReactDOM from "react-dom";
import ImageUpload from "./ImageUpload/ImageUpload";
import FlexImage from "./FlexImage/FlexImage";
import "./styles.css";

// https://cloudinary.com/blog/responsive_images_with_srcset_sizes_and_cloudinary

class App extends Component {
  state = {
    avatar: "https://via.placeholder.com/400",
    jumbo: "https://via.placeholder.com/1500x500"
  };

  // Returns Photo URI From Image Upload Component
  returnPhotoURL = (photoUrl, type) => {
    console.log("Recieved Photo Callback: ", photoUrl, type);
    this.setState({ [type]: photoUrl });
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <h1>Flex Image</h1>
        <ImageUpload type="clan-avatar" returnPhotoURL={this.returnPhotoURL} />
        <FlexImage src={this.state.avatar} />

        <ImageUpload type="clan-jumbo" returnPhotoURL={this.returnPhotoURL} />
        <FlexImage src={this.state.jumbo} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

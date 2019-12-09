import React, { useState } from "react";
import styles from "./ImageUpload.module.css";

const ImageUpload = props => {
  const [errorText, setErrorText] = useState("");
  let disabled = true;
  let minWidth = null;
  let minHeight = null;
  let preset = null;
  let ratio = null;
  switch (props.type) {
    case "user-avatar":
    case "game-cover":
    case "clan-avatar":
    case "game-system":
      minHeight = 400;
      minWidth = 400;
      preset = "400-400-square";
      ratio = 1;
      disabled = false;
      break;
    case "game-jumbo":
    case "clan-jumbo":
      minHeight = 1500;
      minWidth = 500;
      preset = "1500-500-wide";
      ratio = 3;
      disabled = false;
      break;
    default:
      setErrorText("Error: Failed To Load Image Presets");
  }

  // Upload Image to Cloud:
  const imageUpload = files => {
    window.cloudinary.openUploadWidget(
      // Set Cloud Credentials - upload preset is table name
      // Croping Requires Custom Crop Setting on GUI Backend and "custom" option below
      // Resizing Done Client Side With maxImageHeight and maxImageWidth
      {
        cloudName: "gameroster",
        uploadPreset: preset,
        folder: props.type,
        clientAllowedFormats: ["gif", "png", "jpg", "jpeg", "svg"],
        maxFileSize: 4000000,
        minFileSize: 10000,
        minImageWidth: minWidth,
        minImageHeight: minHeight,
        cropping: true,
        croppingAspectRatio: ratio,
        croppingValidateDimensions: true,
        croppingShowDimensions: true,
        croppingShowBackButton: true,
        showSkipCropButton: true,
        showCompletedButton: true,
        croppingCoordinatesMode: "custom",
        multiple: false,
        autoMinimize: true
      },
      (error, result) => {
        if (error) setErrorText(error.statusText);
        if (!result)
          setErrorText(
            "Image Upload Error: Your Image Did Not Upload. Please Try again."
          );
        if (result && result.event === "success") {
          setErrorText("Image Uploaded");
          let updateStateItem = ratio === 1 ? "avatar" : "jumbo";
          props.returnPhotoURL(result.info.url, updateStateItem);
        }
      }
    );
  };

  // Builds Script Tag For API - Not Needed If Using A <script> On Index
  const loadScript = url => {
    // Selects first stript tag on DOM
    const index = window.document.getElementsByTagName("script")[0];
    // Make a <script> tag
    const script = window.document.createElement("script");
    // Set the src for the <script> tag
    script.src = url;
    // Adds a type attribute to <script> as per requirements
    script.type = "text/javascript";
    // Adds our sript tag at the top of the list of tags using parentNode
    index.parentNode.insertBefore(script, index);
  };

  loadScript("https://widget.cloudinary.com/v2.0/global/all.js");

  return (
    <React.Fragment>
      <button
        className={styles.uploadWrapper}
        disabled={disabled}
        onClick={() => imageUpload()}
      >
        <p>Click Here To Upload A Photo</p>
        <p className={styles.errorText}>{errorText}</p>
      </button>
    </React.Fragment>
  );
};

export default ImageUpload;

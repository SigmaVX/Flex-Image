import React from "react";
import styles from "./ImageUpload.module.css";

const ImageUpload = props => {
  // Builds Script Tag For API - Not Used Since We Have <script> On Index
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

  // Upload Image to Cloud:
  const imageUpload = files => {
    window.cloudinary.openUploadWidget(
      // Set Cloud Credentials - upload preset is table name
      // Croping Requires Custom Crop Setting on GUI Backend and "custom" option below
      // Resizing Done Client Side With maxImageHeight and maxImageWidth
      {
        cloudName: "huhlthcuu",
        uploadPreset: "a73ibpr2",
        clientAllowedFormats: ["gif", "png", "jpg", "jpeg"],
        maxFileSize: 3500000,
        minFileSize: 10000,
        maxImageWidth: 200,
        maxImageHeight: 200,
        minImageWidth: 200,
        minImageHeight: 200,
        cropping: true,
        croppingAspectRatio: 1,
        croppingValidateDimensions: true,
        croppingShowDimensions: true,
        croppingShowBackButton: true,
        croppingCoordinatesMode: "custom",
        multiple: false,
        autoMinimize: true
      },
      (error, result) => {
        if (error) console.log("Upload Error: ", error);
        if (!result) console.log("Upload Error: No Response");
        if (result && result.event === "success") {
          console.log("Cloudinary Response: ", result.info);
          console.log("Image URL: ", result.info.url);

          // Return URL To Parent Component
          props.returnPhotoURL(result.info.url);
        }
      }
    );
  };

  return (
    <React.Fragment>
      <div className={styles.ImageUpload} onClick={() => imageUpload()}>
        Click Here To Add A Photo
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;

import React from "react";

const FlexImage = props => {
  return (
    <picture>
      <source
        media="(max-width: 400px)"
        srcSet={
          "https://res.cloudinary.com/gameroster/image/upload/f_auto,q_80,w_400/v1576086063/clan-jumbo/x4rfjejucfiu0gebedsm.jpg"
        }
      />
      <source
        media="(min-width: 401px)"
        srcSet={
          "https://res.cloudinary.com/gameroster/image/upload/f_auto,q_80,w_1500/v1576086063/clan-jumbo/x4rfjejucfiu0gebedsm.jpg"
        }
      />
      <img src={props.src} alt="stuff" />
    </picture>
  );
};

export default FlexImage;

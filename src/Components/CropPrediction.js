import React from 'react';

const CropPrediction = ({ predictedCrop }) => {
  return (
    <div className="crop-prediction">
      <h2>Predicted Crop</h2>
      <p>{predictedCrop}</p>
    </div>
  );
};

export default CropPrediction;

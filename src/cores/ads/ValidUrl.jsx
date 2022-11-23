import React from "react";

function ValidUrl({ notValidUrl }) {
  return (
    <div>
      {notValidUrl && (
        <span className="text-red-600 text-xs ">Inserte una URL valida</span>
      )}
    </div>
  );
}

export default ValidUrl;

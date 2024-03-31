import React from "react";

export default function LoadingScreen() {
  return (
    <div className=" fixed flex-col top-0 bottom-0 left-0 right-0 bg-blue-900 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Claim Portal</h1>
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
}

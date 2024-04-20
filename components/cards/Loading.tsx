import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Image src="/loading.gif" alt="Loading" width={250} height={250} />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;

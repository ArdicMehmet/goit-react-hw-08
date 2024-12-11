import React from "react";
import { Toaster } from "react-hot-toast";
const Notification = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        success: {
          style: {
            background: "green",
            color: "white",
            zIndex: 100,
          },
        },
        error: {
          style: {
            background: "red",
            color: "white",
            zIndex: 100,
          },
        },
        duration: 3000,
      }}
    />
  );
};

export default Notification;

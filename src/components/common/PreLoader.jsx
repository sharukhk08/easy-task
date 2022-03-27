import React from "react";
import { Loader } from "@mantine/core";

const PreLoader = () => {
  return (
    <>
      <div className="preloader-wrapper">
        <Loader size="xl" variant="dots" />
      </div>
    </>
  );
};

export default PreLoader;

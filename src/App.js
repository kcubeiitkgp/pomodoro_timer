import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Timer from "./components/Timer";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: "black",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Timer />
      </Box>
    </>
  );
};

export default App;

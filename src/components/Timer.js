import React, { useState, useEffect } from "react";
import { Button, Container, Select, MenuItem, FormControl, InputLabel, Box, Paper } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

const Timer = () => {
  const timerOptions = [25, 55, 85, 115]; // Timer options in minutes
  const [selectedTime, setSelectedTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60); // Use selectedTime for initial time
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    const timer = setInterval(updateTime, 10); // Update the current time every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      playSound(); // Play the sound when the timer reaches zero
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(selectedTime * 60); // Reset timer to selected time
    setIsRunning(false);
  };

  const playSound = () => {
    const audio = new Audio("/time.mp3"); // Adjust the path if needed
    audio.play();
  };

  // Calculate the percentage of time left for the pie chart
  const timeLeftPercentage = timeLeft / (selectedTime * 60);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <PieChart width={400} height={400}>
        <Pie
          data={[{ value: timeLeftPercentage }, { value: 1 - timeLeftPercentage }]}
          cx={200}
          cy={200}
          innerRadius={0}
          outerRadius={160}
          startAngle={90}
          endAngle={450}
          fill="#000000"
          dataKey="value"
          isAnimationActive={false}
        >
          <Cell fill="#00FFFF" />
        </Pie>
      </PieChart>

      <Box
        display="flex"
        alignItems="center"
        marginTop="10px"
        sx={{
          "& .MuiFormControl-root": {
            height: "45px", // Adjust the height of the FormControl
            minWidth: "100px",
            marginRight: "16px",
            display: isRunning ? "none" : "block",
          },
          "& .MuiButton-root": {
            width: "80px",
          },
          "& .MuiPaper-root": {
            background: "#ffffff",
          },
          "& .MuiMenuItem-root": {
            height: "30px", // Adjust the height of the MenuItem
          },
          "& .MuiButton-contained": {
            marginLeft: "10px", // Add left margin of 10px to the Reset button
          },
        }}
      >
        {/* Use Material-UI Select component */}
        {isRunning ? null : ( // Conditionally render the FormControl based on isRunning state
          <FormControl variant="outlined" component={Paper}>
            <InputLabel></InputLabel>
            <Select value={selectedTime} onChange={(e) => setSelectedTime(Number(e.target.value))}>
              {timerOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time} minutes
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {isRunning ? (
          <>
            <Button variant="contained" onClick={stopTimer}>
              Stop
            </Button>
            <Button variant="contained" onClick={resetTimer}>
              Reset
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={startTimer}>
            Start
          </Button>
        )}
      </Box>

      {/* Display the current time at the bottom of the page */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom="0"
        width="100%"
        height="50px"
        backgroundColor="#000000"
        color="#00FFFF"
        fontSize="20px"
      >
        <span>{currentTime}</span>
      </Box>
    </Container>
  );
};

export default Timer;

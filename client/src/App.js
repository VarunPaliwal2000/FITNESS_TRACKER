// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import { lightTheme } from "./utils/Themes";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  // const [currentUser, setCurrentUser] = useState(false);
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          {true ? (
            <Container>
              <Navbar />
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/workout" exact element={<Workout />} />
              </Routes>
            </Container>
          ) : (
            <Container>
              <Authentication />
            </Container>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

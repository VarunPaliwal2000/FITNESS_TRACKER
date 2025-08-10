import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
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

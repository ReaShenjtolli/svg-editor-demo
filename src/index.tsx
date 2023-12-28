import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import './assets/styles/index.css'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
      styleOverrides: {
        root: {
          overflow: "visible"
        },
      },
    },
  },
});

root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

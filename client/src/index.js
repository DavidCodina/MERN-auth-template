import ReactDOM          from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider }      from './Context';
import { ThemeProvider } from '@material-ui/core'
import { theme }         from './theme';
import App               from './App';


ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>, 
  document.getElementById('root')
);


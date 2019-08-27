import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/i18n';
import ErrorBoundary from './error_boundry'

//Lazy load component only when needed
const Game = React.lazy(() => import('./component/game/game'));

ReactDOM.render(
  <ErrorBoundary>
      <Suspense fallback="loading...">
        <Game />,
      </Suspense>
  </ErrorBoundary>,
  document.getElementById('root')
);

/*i=0;
s='0'

if(i == 0) => true
if(s == 0) => true

if(i !== 0) => false
if(s !== 0) => true

dev=0
if(dev) ==> false
if(!dev) ==> true*/
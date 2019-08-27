import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';

//Lazy load component only when needed
const Game = React.lazy(() => import('./game'));

ReactDOM.render(
  <Suspense fallback="loading...">
    <Game />,
  </Suspense>,
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
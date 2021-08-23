import React from 'react';
import Router from './Router';
import {Header} from './components/Header';
import {Loading} from './components/UIkit';

const App = () => {
  return(
    <>
      <Loading>
        <Header />
        <main className='c-main'>
          <Router />
        </main>
      </Loading>
    </>
  )
}

export default App;
import React from 'react';
import Tabs from "./components/Tabs";

function App() {

  return (
    <>
       <Tabs dataUrl={'https://logiclike.com/docs/courses.json'} allTagsDefaultLabel={'Все темы'}/>
    </>
  );
}

export default App;

import * as React from 'react';

import Routes from '../routes';

import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App: React.FunctionComponent = () => (
    <>
        <Routes/>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </>
);

export default App;

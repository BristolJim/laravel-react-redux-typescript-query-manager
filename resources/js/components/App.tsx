import * as React from 'react'

import Routes from '../routes'

import Footer from './todos/Footer'
import AddTodo from '../containers/todos/AddTodo'
import VisibleTodoList from '../containers/todos/VisibleTodoList'

const App: React.FunctionComponent = () => (
    <>
        <Routes/>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </>
)

export default App

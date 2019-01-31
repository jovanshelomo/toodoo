import React, { Component } from 'react';
import Home from '../Home';
import ToDoEditor from '../ToDoEditor'
import { Wrapper } from './styles';
import { BrowserRouter, Route } from 'react-router-dom'

export default class App extends Component {

    render = () => {
        return (
            <BrowserRouter>
                <Wrapper>

                    <Route exact path='/' component={Home} />
                    <Route path='/new' component={ToDoEditor} />

                </Wrapper>
            </BrowserRouter>

        );

    }
}
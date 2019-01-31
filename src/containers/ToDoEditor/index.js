import React, { Component } from 'react';
import { Wrapper, ContentArea } from './styles';
import AppBar from '../../components/AppBar';
import FloatingActionButton from '../../components/FloatingActionButton';
import { NavLink } from "react-router-dom"
import InputWithTitle from '../../components/InputWithTitle';
import MyButton from '../../components/MyButton';

export default class App extends Component {

    _goBack = () => {
        this.props.history.goBack();
    }
    render = () => {
        return (
            <Wrapper>
                <AppBar title="Add New TOODOO" icon="fas fa-arrow-left" onClickIcon={() => this._goBack()} />
                <FloatingActionButton icon="fas fa-save" />
                <ContentArea>
                    <InputWithTitle />
                    <MyButton />
                </ContentArea>

            </Wrapper>
        );

    }
}
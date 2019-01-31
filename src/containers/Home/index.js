import React, { Component } from 'react';
import { Wrapper, ContentArea } from './styles';
import AppBar from '../../components/AppBar';
import ToDoCard from '../../components/ToDoCard';
import FloatingActionButton from '../../components/FloatingActionButton';
import ToDoEditor from '../ToDoEditor'
import { NavLink } from 'react-router-dom'


export default class Home extends Component {
    state = {
        todos: [{
            id: '1',
            title: "judul 1",
            due: "kemaren",
            location: "smak 1",
            subtitle: "sub 1",
            tasks: [{
                id: '1',
                content: "content 1 pertama (default: checked)",
                isDone: true
            }, {
                id: '2',
                content: "konten 1 kedua (default: checked)",
                isDone: true
            }]
        }, {
            id: '2',
            title: "judul 2",
            due: "hari ini",
            location: "smak 2",
            subtitle: "sub 2",
            tasks: [{
                id: '1',
                content: "content 2 pertama (default: checked)",
                isDone: true
            }, {
                id: '2',
                content: "konten 2 kedua (default: unchecked)",
                isDone: false
            }]
        }, {
            id: '3',
            title: "judul 3",
            due: "besok",
            location: "smak 3",
            subtitle: "sub 3",
            tasks: [{
                id: '1',
                content: "content 3 pertama (default: unchecked)",
                isDone: false
            }, {
                id: '2',
                content: "konten 3 kedua (default: checked)",
                isDone: true
            }]
        }, {
            id: '4',
            title: "judul 4",
            due: "lusa",
            location: "smak 4 (gaada ya)",
            subtitle: "sub 4",
            tasks: [{
                id: '1',
                content: "content 4 pertama (default: unchecked)",
                isDone: false
            }, {
                id: '2',
                content: "konten 4 kedua (default: unchecked)",
                isDone: false
            }]
        },]


    }
    _onToggleTaskCompletion = (ToDoId, taskId) => {
        const tempToDo = [...this.state.todos];

        const selectedToDoIndex = tempToDo.findIndex(todo => todo.id === ToDoId);
        if (selectedToDoIndex < 0) return;
        //---------------------------------------------------
        const selectedTaskIndex = tempToDo[selectedToDoIndex].tasks.findIndex(task => task.id === taskId);
        if (selectedTaskIndex < 0) return;


        const isDoneValue = tempToDo[selectedToDoIndex].tasks[selectedTaskIndex].isDone
        tempToDo[selectedToDoIndex].tasks[selectedTaskIndex].isDone = !isDoneValue; //flip true or false

        this.setState({ todos: tempToDo });
    }


    render = () => {
        return (
            <Wrapper>
<ToDoEditor/>

                <AppBar icon="fas fa-bars" title="TOODOO" />
               <ContentArea>
                 {
                       this.state.todos.map(todo => <ToDoCard
                          key={todo.id}
                          value={todo}
                           _onToggleTaskCompletion={this._onToggleTaskCompletion} />)
                   }
                </ContentArea>
                <NavLink to="/new">
                <FloatingActionButton icon="fas fa-plus" />
                </NavLink>
           </Wrapper>

        );

    }

}
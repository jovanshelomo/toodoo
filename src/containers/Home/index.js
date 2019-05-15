import React, { Component } from 'react';
import { Wrapper, ContentArea } from './styles';
import FloatingActionButton from '../../components/FloatingActionButton';
import AppBar from '../../components/AppBar';
import ToDoCard from '../../components/ToDoCard';

// Luarnya class
const dummyData = [{
  id: '1',
  title: "judul 1",
  due: "kemaren",
  location: "smak 1",
  subtitle: "sub 1",
  tasks: [{
    id: '1',
    content: "content 1 pertama",
    isDone: true
  }, {
    id: '2',
    content: "konten 1 kedua",
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
    content: "content 2 pertama",
    isDone: true
  }, {
    id: '2',
    content: "konten 2 kedua",
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
    content: "content 3 pertama",
    isDone: false
  }, {
    id: '2',
    content: "konten 3 kedua",
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
    content: "content 4 pertama",
    isDone: false
  }, {
    id: '2',
    content: "konten 4 kedua",
    isDone: false
  }]
}];

export default class Home extends Component {
  constructor(props) {
    super(props);

    /**
     * Kalau di "database" udah ada todos, pakai todos di database,
     * otherwise, pake dummyData (dummyTodos).
     */
    let db = [];
    if (props.location.state && props.location.state.todos) {
      // Todos nya ada, jadi pakai "database" (props.location.state.todos)
      db = props.location.state.todos;
    } else {
      // Artinya, belom ada db
      db = dummyData;
    }

    this.state = {
      todos: db
    };
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

  _addTodo = () => {
    this.props.history.push({
      pathname: '/new',
      state: {
        todos: this.state.todos
      }
    })
  }

  _editTodo = (todo) => {
    this.props.history.push({
      pathname: '/edit',
      state: {
        prevPath: '/',
        data: todo,
        todos: this.state.todos
      }
    });
  }

  _onDelete = (id) => {
    const tempTodos = [...this.state.todos];
    const index = tempTodos.findIndex(t => t.id === id);

    if (index >= 0) {
      tempTodos.splice(index, 1);
      this.setState({ todos: tempTodos });
    }
  }

  render = () => {
    return (
      <Wrapper>
        <AppBar title="TOODOO" />
        <ContentArea>
          {
            this.state.todos.map(todo => <ToDoCard
              onDelete={() => this._onDelete(todo.id)}
              onClickTitle={() => this._editTodo(todo)}
              key={todo.id}
              value={todo}
              _onToggleTaskCompletion={this._onToggleTaskCompletion} />)
          }
        </ContentArea>
        <FloatingActionButton icon="fas fa-plus"
          onClick={this._addTodo} />
      </Wrapper>
    )
  }
}
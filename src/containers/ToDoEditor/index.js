import React, { Component } from 'react';
import InputWithTitle from '../../components/InputWithTitle';
import FloatingActionButton from '../../components/FloatingActionButton';
import AppBar from '../../components/AppBar';
import {
  Wrapper, ContentArea,
  Column, Title,
  RoundedButton, RoundedButtonIcon,
  TaskHeaderRow, TaskEditorRow, Divider, NoTasksText
} from './styles';

export default class ToDoEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      title: '',
      location: '',
      due: '',
      tasks: [],

      noTasks: true,
      unchanged: true

    }

    if (props.location.state
      && props.location.state.data) {
      const editedTodo = props.location.state.data;

      this.state = {
        isEdit: true,
        id: editedTodo.id,
        title: editedTodo.title,
        location: editedTodo.location,
        due: editedTodo.due,
        tasks: editedTodo.tasks,

        noTasks: false,
        unchanged: true
      }

    }
  }

  _goBack = () => {
if(this.state.unchanged){
  this.props.history.goBack();
}
else{
  if(window.confirm("You have an unsaved data. Do you want to continue?")){
    this.props.history.goBack();
  }else{

  }
}

  }

  _onChange = (field, value) => {
    this.setState({ [field]: value })

    //to set fab background color
    this.setState({ bgColor: '#4CAF50' })
    this.setState({unchanged: false})
  }

  _addTask = () => {
    const length = this.state.tasks.length;

    let id = 1;
    if (length > 0) id = (Number(this.state.tasks[length - 1].id) + 1).toString();

    const tempTasks = [...this.state.tasks];
    tempTasks.push({ id: id, content: '', isDone: false });

    this.setState({ tasks: tempTasks });

    //
    this.setState({noTasks: false});
  }

  _onChangeTask = (id, value) => {
    const tempTask = [...this.state.tasks];
    const index = tempTask.findIndex(t => t.id === id);

    //to set fab background color
    this.setState({ bgColor: '#4CAF50' })
    this.setState({unchanged: false})

    if (index >= 0) {
      tempTask[index].content = value;
      this.setState({ tasks: tempTask });
    }
  }

  _onDeleteTask = (id) => {
    const tempTask = [...this.state.tasks];
    const index = tempTask.findIndex(t => t.id === id);

    if (index >= 0) {
      tempTask.splice(index, 1);
      this.setState({ tasks: tempTask });
      this.setState({ bgColor: '#43B581' })
    }

    if(tempTask.length === 0){
      this.setState({noTasks: true});
    }

  }

  _onSave = () => {
    let updatedTodos = [];
    if (this.props.location.state && this.props.location.state.todos) {
      updatedTodos = this.props.location.state.todos;
    }
    // Changes

    if (this.state.isEdit) {
      const updatedTodo = updatedTodos.find(t => t.id === this.state.id);
      updatedTodo.title = this.state.title;
      updatedTodo.location = this.state.location;
      updatedTodo.due = this.state.due;
      updatedTodo.tasks = this.state.tasks;
    } else {
      const length = updatedTodos.length;

      let id = 1;
      if (length > 0) id = (Number(updatedTodos[length - 1].id) + 1).toString();

      updatedTodos.push({
        id: id,
        title: this.state.title.trim().length != 0 ? this.state.title : "Untitled Task",
        location: this.state.location.trim().length != 0? this.state.location : "no location",
        due: this.state.due.trim().length != 0? this.state.due : "no due",
        tasks: this.state.tasks
      });
    }
    // Changes

    // Tell react router (library-nya) utk pindah halaman
    // ke '/' (home) dengan membawa data todos yang sudah di update.
    this.props.history.push({
      pathname: '/',
      state: {
        todos: updatedTodos
      }
    })
  }

  render = () => {
    return (
      <Wrapper>
        <AppBar
          icon="fas fa-arrow-left"
          title="Add New ToDo"
          onClickIcon={() => this._goBack()} />
        <ContentArea>
          <Column>
          <Title>Informations</Title>
            <InputWithTitle
              onChange={(v) => this._onChange('title', v)}
              style={{ margin: '16px' }}
              title='Title'
              value={this.state.title} />
            <InputWithTitle
              onChange={(v) => this._onChange('location', v)}
              style={{ margin: '16px' }}
              title='Location'
              value={this.state.location} />
            <InputWithTitle
              onChange={(v) => this._onChange('due', v)}
              style={{ margin: '16px' }}
              title='Due'
              value={this.state.due} />

            <Divider />
          </Column>

          <Column>
            <TaskHeaderRow>
              <Title>Tasks</Title>
              <RoundedButton onClick={this._addTask}>
                <RoundedButtonIcon><i className='fas fa-plus' /></RoundedButtonIcon>
              </RoundedButton>
            </TaskHeaderRow>
            {
              
              this.state.noTasks === false
                
                ?

                this.state.tasks.map(t => (
                  <TaskEditorRow key={t.id}>
                    <RoundedButton style={{ backgroundColor: '#F44336', boxShadow: '0 2px #D32F3F' }}
                      onClick={() => this._onDeleteTask(t.id)}>
                      <RoundedButtonIcon><i className='fas fa-trash' /></RoundedButtonIcon>
                    </RoundedButton>
  
                    <InputWithTitle
                      style={{ flex: 1 }}
                      title={`Task ${t.id}`}
                      value={t.c582ontent}
                      onChange={(v) => this._onChangeTask(t.id, v)} />
                  </TaskEditorRow>
                ))
                
                :

                  <NoTasksText>No tasks currently. Add a task by pressing the '+' button</NoTasksText>
                
            }
          </Column>
          
        </ContentArea>

        <FloatingActionButton icon="fas fa-save"
          onClick={this._onSave}
          bgColor={this.state.bgColor} />
      </Wrapper>
    );
  }
}
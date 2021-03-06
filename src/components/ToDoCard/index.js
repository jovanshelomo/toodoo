import React, { Component } from 'react';
import { Wrapper, Title, IconBox, Icon, Content, Divider, Subtitle, Row, TitleRow } from './styles';
import TaskRow from '../TaskRow';


export default class ToDoCard extends Component {
  render = () => {
    return (
      <Wrapper>
        <TitleRow>
          <Title onClick={this.props.onClickTitle}>{this.props.value.title}</Title>
          <IconBox onClick={this.props.onDelete}><Icon style={{ color: '#F44336' }} className="fas fa-trash" /></IconBox>
        </TitleRow>
        <Row>
          <IconBox><Icon className="fas fa-clock" /></IconBox>

          <Content>{this.props.value.due}</Content>
        </Row>
        <Row>
          <IconBox><Icon className="fas fa-map-marker-alt" /></IconBox>
          <Content>{this.props.value.location}</Content>
        </Row>
        <Divider />
        <Subtitle>Tasks</Subtitle>

        {this.props.value.tasks.map(task => <TaskRow
          key={task.id}
          content={task.content}
          completed={task.isDone}
          onToggle={() => this.props._onToggleTaskCompletion(this.props.value.id, task.id)} />)
        }
      </Wrapper>
    );

  }
}
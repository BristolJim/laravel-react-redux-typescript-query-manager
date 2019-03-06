import * as React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../actions/todos';
import AddTodoForm from '../../components/todos/AddTodo';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    addTodo: value => dispatch(addTodo(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodoForm);

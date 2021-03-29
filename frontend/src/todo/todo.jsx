import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoList from '../todo/todoList'
import TodoForm from '../todo/todoForm'

const URL = 'http://localhost:3001/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {description: '', list: []}

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.reflesh()
    }

    reflesh(description = '') {
        const search = description ? `&description__regex=/${description}/` :''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.reflesh())
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value})        
    }

    handleDelete(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.reflesh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.reflesh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.reflesh(this.state.description))
    }

    handleSearch() {       
        this.reflesh(this.state.description)
    }

    handleClear() {
        this.reflesh()

    }

    render() {
        return (
            <div>
                <PageHeader 
                    name="Tarefas" 
                    sub="cadastro" />
                <TodoForm 
                    description={this.state.description} 
                    handleAdd={this.handleAdd}  
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList 
                    handleDelete={this.handleDelete}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}
//project.js
class Project{
    constructor(name){
        this.name=name;
        this.todos=[];
    }
    addTodo(todo){
        this.todos.push(todo);
    }
    removeTodo(todo){
        this.todos=this.todos.filter(t=>t.title !== todo.title);
    }
    getTodos(){
        return this.todos;
    }
    getTodo(){
        return this.todos.find(t=>t.title === title);   
    }
};
export default Project;

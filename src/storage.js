export function savetotdo(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}
export function loadtodos(){
    const toods=localStorage.getItem("todos")
    return toods ? JSON.parse(toods) :[];
}
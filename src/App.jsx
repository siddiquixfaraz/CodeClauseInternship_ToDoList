import { useState } from 'react';
import book from './images/book.svg'

const TodoCard = ({ todo, id, handleDelete, handleEdit }) => {
  return (
    <div id='card' className="bg-gray-100 lg:w-[30vw] h-fit p-3 gap-2 shadow-md rounded-md flex justify-between items-center  sm:w-[80vw]">
      <span className='flex-1 text-lg'>{todo}</span>
      <button onClick={() => handleEdit(id)} className='text-blue-400 font-semibold'>Edit</button>
      <button onClick={() => handleDelete(id)} className='text-red-400 font-semibold'>Delete</button>
    </div>
  )
}


function App() {

  const [todocard, settodocard] = useState([])
  const [todo, settodo] = useState("")
  const [editId, setEditId] = useState(0)

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId){
      const editTodo = todocard.find((i)=>i.id === editId);
      const updatedTodo = todocard.map((t)=>t.id === editTodo.id 
        ? (t = {id: t.id, todo}): {id: t.id , todo : t.todo}
      );

      settodocard(updatedTodo)
      setEditId(0)
      settodo("")
      return
    }

    if (todo) {
      settodocard([{ id: `${todo}-${Date.now()}`, todo }, ...todocard])
    }
    settodo("")
  }

  const handleDelete = (id) => {
    const deltodo = todocard.filter((t) => t.id !== id)
    settodocard([...deltodo])
  }

  const handleEdit = (id) => {
    
    const edittodo = todocard.find((t) => t.id === id)
    settodo(edittodo.todo)
    setEditId(id)
  }

  return (
    <div className="flex w-[100vw] h-[100vh] items-center py-10 bg-gradient-to-b from-blue-50 gap-5 to-blue-200 flex-col">
      <div className="flex items-center bg-blue-300 py-5 px-10 rounded-full shadow-lg shadow-blue-400 gap-20">
        <p className='text-lg font-bold text-white'>Manage Your <br />Time Well</p>
        <img src={book} alt="" className='w-20' />
      </div>
      <form className='flex items-center bg-blue-300  rounded-full shadow-lg shadow-blue-400 '
          onSubmit={handleSubmit}>
          <input className='bg-transparent p-2 w-[270px] text-lg text-white rounded-full flex-1 outline-none placeholder-white'
           type="text" placeholder='Enter text' onChange={handleChange} value={todo} />
          <button type='submit' className='text-white font-extrabold text-4xl p-2 w-14 rounded-full  bg-blue-600 shadow-sm shadow-blue-700 '>+</button>
        </form>
      <div className='flex flex-col gap-4 '>
        {
          todocard.map((card) => (
            <TodoCard todo={card.todo} id={card.id} handleDelete={handleDelete} handleEdit={handleEdit} />
          ))
        }
      </div>
    </div>
  );
}

export default App;

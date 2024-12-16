import './App.css'
import { useQuery,gql } from '@apollo/client'

const query = gql `
  query getTodosWithUser{
    getTodos{
    title
    completed
    user{
      email
      name
    }
    }
  }
`

function App() {
  const {data,loading,error} = useQuery(query);
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error.message}</h1>
  return (
    <>
      <div className="App">
      <h1>Todos</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>User name</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo,index)=>(
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo.user?.name || 'UNKNOWN'}</td>
            </tr>
          ))};
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App

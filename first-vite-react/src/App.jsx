import First_function from "./custom_1"

function App() {
  const some_content="This content is from a variable"

  return (
    <>
    <First_function/>
    <h1>Hello World! with vite {some_content}</h1>
    </>
    
   
  )
}
// {some_content} - evaluation expression


export default App

function App() {
  const signIn = async () => {
    console.log('Sign In')
  }

  return (
    <div className='text-center w-screen h-screen flex justify-center items-center'>
      Hello World
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={signIn}>Sign In</button>
    </div>
  );
}

export default App;

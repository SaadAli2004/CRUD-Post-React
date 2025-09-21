

function App() {

  // const [userInput, setUserInput] = useState("")
  return (
    <>
      <div className="bg-amber-300">
        <div className="p-10">

        <div className="text-lg flex flex-col gap-2 py-4">
          {/*Title*/}

          <div className="border flex flex-col w-3/12">
          <form onSubmit={(e) => {e.preventDefault();
            submitHandler(userInput);
          }}
          ></form>
            <label htmlFor="title">Enter post title here</label>
            <input type="text" name="title" placeholder="Enter post title" className="bg-amber-900 text-white" />
          </div>
          {/*Image*/}

          <div className="border flex flex-col w-3/12">
            <label htmlFor="title">Enter post image here</label>
            <input type="text" name="img" placeholder="Enter image url" className="bg-amber-900 text-white" />
          </div>
          
        </div>
        {/*Description*/}
        <div className="flex border text-2xl">
          
          <div className="border w-2/5 flex flex-col justify-center gap-2">
            <label htmlFor="desc">Enter post description</label>
            <textarea type="text" name="desc" placeholder="Enter post description" className="bg-amber-900 h-80 text-white" />
          </div>
        </div>
      </div>
        </div>
    </>
  );
}

export default App;
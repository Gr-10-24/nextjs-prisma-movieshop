export default async function Dashboard(){
  
    
  return (
    <div className="flex">
        <div className="w-1/2 lg:w-1/3">
        
            <div className="flex container justify-center">
              <h1 className="text-2xl text-black p-3">Movie Registration Form</h1>
            </div>
            <div className=" ">
              <div>
              <label className="p-5 m-5" htmlFor="">Name:</label>
              <input type="text" />
              </div>
              <div>
              <label className="p-5 m-5" htmlFor="">Email:</label>
              <input type="text" />
              </div>
              <div>
              <label className="p-5 m-5" htmlFor="">Address:</label>
              <input type="text" />
              </div>
            </div>
        </div>
      
      <div className="w-1/2 lg:w-2/3 overflow-auto p-2">
            <h1 className="text-black text-2xl m-4">Order details</h1>
      </div>
        
    
    </div>     

  );
}
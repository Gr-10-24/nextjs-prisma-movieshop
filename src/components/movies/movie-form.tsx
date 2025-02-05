import MovieForm from "../ui/movies/form";

export default function AddMovie(){
    return(
        <main className=" border border-black ">
            <div className="flex container justify-center">
            <h1 className="text-2xl text-black p-3">Movie Registration Form</h1>
            </div>
            <div className="flex container justify-center">
                <MovieForm/>
            </div>
        </main>
    )
}
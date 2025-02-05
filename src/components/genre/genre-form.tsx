import GenreForm from "../ui/genre/form";

export default function AddGenre(){
    return(
        <main>
            <div className="flex container justify-center">
            <h1 className="text-2xl text-black">Genre Registration Form</h1>
            </div>
            <div className="flex container justify-center">
                <GenreForm/>
            </div>
        </main>
    )
}
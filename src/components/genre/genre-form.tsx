import GenreForm from "../ui/genre/form";

export default function AddGenre() {
  return (
    <main>
      <div className="flex container justify-end px-3">
        <h1 className="text-2xl text-black py-5">Genre Registration Form</h1>
      </div>
      <div className="flex container justify-center">
        <GenreForm />
      </div>
    </main>
  );
}

import ViewMovie from "@/components/movies/viewmovie";
import { GetMovie } from "../actions/viewmovie";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MovieForm from "@/components/ui/movies/form";
import AddBan from "@/components/ban/banform";
import { Getban } from "../actions/ban";
import ViewBan from "@/components/ban/banview";

export default async function Movies() {
  const getban = await Getban();

  return (
    <div className="flex">
      <div className=" border  w-1/2 lg:w-1/3 py-6 ">
            <h1 className="flex justify-center pb-2 text-2xl text-black ">Ban User</h1>
             <AddBan/>
             
      </div>
 
      
      <div className="w-1/2 lg:w-2/3 overflow-auto p-2 py-5">
        <h1 className="flex text-black justify-center m-4 text-2xl">Movie details</h1>
        {getban.length === 0 && <p>No ban user at yet</p>}
        {getban.length > 0 && (
          <Table>
            <TableCaption>A list of Ban User</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableHead>Ban Reason</TableHead>
                <TableHead>Unban</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getban.map((user) => (
                <ViewBan key={user.id} data={user} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

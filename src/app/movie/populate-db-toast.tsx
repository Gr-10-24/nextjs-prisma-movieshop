// "use client"

// // A toast to ask an admin if the database should be populated
// import { toast } from "@/hooks/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";
// import { useEffect } from "react";
// import { getMovieCount, getRejectCookie, populateDb, setRejectCookie } from "@/app/actions/populate-db";

// export default function PopulateDBToast () {
//   useEffect(() => {
//     (async () => {
//       const movieCount = getMovieCount()
//       const isRejected = getRejectCookie()
//       await Promise.all([movieCount, isRejected])
//       if (!await isRejected && await movieCount < 10)
//         toast({
//           title: "Add some movies?",
//           description: "This site seems a bit empty. Do you want me to add some movies to it?",
//           action: (
//             <>
//               <ToastAction
//                 onClick={() => {
//                   populateDb().then(result => {
//                     if (result) {
//                       toast({
//                         description: "Successfully added movies!",
//                       })
//                     } else {
//                       toast({
//                         description: "Something went wrong. :-(",
//                         variant: "destructive"
//                       })
//                     }
//                   })
//                 }}
//                 altText="Add movies"
//               >
//               Add some Movies
//             </ToastAction>
//             <ToastAction
//               onClick={setRejectCookie}
//               altText="Dismiss Forever"
//             >
//               No, go away forever
//             </ToastAction >
//           </>
//           )
//       })
//     })()
//   })

//   return null
// }

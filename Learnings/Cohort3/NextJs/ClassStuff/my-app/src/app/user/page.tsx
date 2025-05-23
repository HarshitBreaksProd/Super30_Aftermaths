// import axios from "axios";

// async function getUserDetails() {
//   const response = await axios.get("http://localhost:3000/api/v1/user/details");
//   return response.data;
// }

// export default async function Page() {
//   const userData = await getUserDetails();
//   await new Promise((r) => setTimeout(r, 5000));
//   return (
//     <div className="flex flex-col justify-center h-screen">
//       <div className="flex justify-center">
//         <div className="border p-8 rounded">
//           <div>Name: {userData?.name}</div>

//           {userData?.email}
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function Page() {
  return <div>Hello</div>;
}

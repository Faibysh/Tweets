// import { useEffect, useState } from "react";
// import Card from "../Card/Card";
// const BASE_URL = "https://6455345df803f345763d4e4a.mockapi.io/users/";
// export default function Pagination() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   useEffect(() => {
//     const fechtData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}?page=${page}&per_page=2`);
//         const json = await res.json();
//         setData(json.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fechtData();
//   }, [page]);
//   return (
//     <div className="Pagination">
//       <div className="user-list">
//         {data &&
//           data.map((userData) => (
//             <Card
//               key={userData.id}
//               avatar={userData.avatar}
//               user={userData.user}
//               followers={userData.followers}
//               tweets={userData.tweets}
//             />
//           ))}
//       </div>
//       <button>Load More</button>
//     </div>
//   );
// }

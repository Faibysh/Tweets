import { useState, useEffect, useRef } from "react";
import styles from "./Markup.module.css";
import axios from "axios";
import Card from "../Card/Card";
import { paginate } from "../../utils/paginate";

const BASE_URL = "https://6455345df803f345763d4e4a.mockapi.io/users/";
const PAGE_SIZE = 3;

export default function Markup() {
  const firstRender = useRef(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(3);
  const [followings, setFollowings] = useState(() => {
    const followingString = localStorage.getItem("following");
    return followingString ? followingString.split(",") : [];
  });

  function handleFollowClick(id) {
    if (followings.includes(id)) {
      setFollowings((prevState) => [
        ...prevState.filter((item) => item !== id),
      ]);
    } else {
      setFollowings((prevState) => [...prevState, id]);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("following", followings);
  }, [followings]);

  return (
    <div>
      <div className={styles.container}>
        {paginate(page, PAGE_SIZE, users).map((user, index) => (
          <Card
            key={index}
            following={followings.includes(user.id)}
            userData={user}
            onToggleFollow={handleFollowClick}
          />
        ))}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import Card from "../Card/Card";
// const BASE_URL = "https://6455345df803f345763d4e4a.mockapi.io/users/";
// const [totalPage, setTotalPage] = useState(0);
// export function Pagination() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1) = useState(0);
//   useEffect(() => {
//     const fechtData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}?page=${page}&per_page=2`);
//         const json = await res.json();
//         setData(json.data);
//         setTotalPage()
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
//       <button onClick={() => setPage(page + 1)}>Load More</button>
//     </div>
//   );
// }

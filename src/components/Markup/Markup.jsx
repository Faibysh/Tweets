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
  const [page, setPage] = useState(1);
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

  function handleLoadMore() {
    setPage((prevState) => prevState + 1);
  }

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
      {users.length > page * PAGE_SIZE && (
        <button className={styles.more} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

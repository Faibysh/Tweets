import { useState, useEffect, useRef } from "react";
import styles from "./Markup.module.css";
import axios from "axios";
import Card from "../Card/Card";

const BASE_URL = "https://6455345df803f345763d4e4a.mockapi.io/users/";

export default function Markup() {
  const firstRender = useRef(true);
  const [users, setUsers] = useState([]);
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
        {users.slice(0, 3).map((user, index) => (
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

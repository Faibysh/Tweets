import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default function Card({ following, userData, onToggleFollow }) {
  const [followersCount, setFollowersCount] = useState(
    () =>
      Number(localStorage.getItem(`followersCount_${userData.id}`)) ||
      userData.followers
  );

  Card.propTypes = {
    following: PropTypes.bool,
    userData: PropTypes.object.isRequired,
    onToggleFollow: PropTypes.func.isRequired,
  };

  useEffect(() => {
    localStorage.setItem(`followersCount_${userData.id}`, followersCount);
  }, [followersCount, userData.id]);

  function handleFollowClick() {
    if (following) {
      setFollowersCount((prevState) => prevState - 1);
    } else {
      setFollowersCount((prevState) => prevState + 1);
    }
    onToggleFollow(userData.id);
  }

  return (
    <div className={styles.container}>
      {userData && (
        <>
          <img
            className={styles.logo}
            src="/src/images/vector.svg"
            alt="logo"
          />
          <button className={styles.back}>Back</button>
          <img
            className={styles.decor}
            src="/src/images/decoration.png"
            alt="decoration"
          />
          <img className={styles.avatar} src={userData.avatar} alt="avatar" />
          <img
            className={styles.rectangle}
            src="/src/images/rectangle.svg"
            alt="rectangle"
          />
          <p className={styles.name}> @ {userData.user}</p>
          <p className={styles.paragraph}> {userData.paragraph}</p>
          <div className={styles.items}>
            <ul className={styles.tweets}>
              <li className={styles.number}>{userData.tweets}</li>
              <h3 className={styles.text}>TWEETS</h3>
            </ul>
            <ul className={styles.followers}>
              <li className={styles.number}>{followersCount}</li>
              <h3 className={styles.text}>FOLLOWERS</h3>
            </ul>
          </div>
          <button
            className={following ? styles.buttonFollowing : styles.button}
            onClick={handleFollowClick}
          >
            {following ? "Following" : "Follow"}
          </button>
        </>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import styles from "./Card.module.css";

// export default function Card({
//   following,
//   userData,
//   onToggleFollow,
//   onLoadMore,
// }) {
//   const [followersCount, setFollowersCount] = useState(
//     () =>
//       Number(localStorage.getItem(`followersCount_${userData.id}`)) ||
//       userData.followers
//   );

//   useEffect(() => {
//     localStorage.setItem(`followersCount_${userData.id}`, followersCount);
//   }, [followersCount, userData.id]);

//   function handleFollowClick() {
//     if (following) {
//       setFollowersCount((prevState) => prevState - 1);
//     } else {
//       setFollowersCount((prevState) => prevState + 1);
//     }
//     onToggleFollow(userData.id);
//   }

//   function handleLoadMoreClick() {
//     onLoadMore();
//   }

//   return (
//     <div className={styles.container}>
//       {userData && (
//         <>
//           <img
//             className={styles.logo}
//             src="/src/images/vector.svg"
//             alt="logo"
//           />
//           <button className={styles.back}>Back</button>
//           <img
//             className={styles.decor}
//             src="/src/images/decoration.png"
//             alt="decoration"
//           />
//           <img className={styles.avatar} src={userData.avatar} alt="avatar" />
//           <img
//             className={styles.rectangle}
//             src="/src/images/rectangle.svg"
//             alt="rectangle"
//           />
//           <p className={styles.name}>{userData.user}</p>
//           <div className={styles.items}>
//             <ul className={styles.info}>
//               <li className={styles.tweets}>{userData.tweets}</li>
//               <h3 className={styles.text}>TWEETS</h3>
//             </ul>
//             <ul className={styles.info}>
//               <li className={styles.tweets}>{followersCount}</li>
//               <h3 className={styles.text}>FOLLOWERS</h3>
//             </ul>
//           </div>
//           <button
//             className={following ? styles.buttonFollowing : styles.button}
//             onClick={handleFollowClick}
//           >
//             {following ? "Following" : "Follow"}
//           </button>
//           <button className={styles.loadMore} onClick={handleLoadMoreClick}>
//             Load More
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

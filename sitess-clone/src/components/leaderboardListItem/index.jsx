import Image from "next/image";
import Styles from "./styles.module.css";

const LeaderboardListItem = ({ props }) => {
  return (
    <div className={Styles.leaderboardItemContainer}>
      <div className={Styles.profileDetailContainer}>
        <Image
          className={Styles.iconStyle}
          src={props.imageURL}
          width={32}
          height={32}
          alt="profile-icon"
        />
        <h5>{props.username}</h5>
      </div>
      <div className={Styles.profileDetailContainer}>
        <Image
          className={Styles.iconStyle}
          src={"/assets/icons/cookie.png"}
          width={32}
          height={32}
          alt="profile-icon"
        />
        <h4>{props.value}</h4>
      </div>
    </div>
  );
};

export default LeaderboardListItem;

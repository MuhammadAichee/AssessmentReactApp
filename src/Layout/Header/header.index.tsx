import { Popover } from "antd";
import './header.index.css'
const Header = () => {
  const content = (
    <div className={"logout-div"}>
      {/* <img src={Logout} alt="" className={style["logout-image"]} /> */}
      <div>Logout</div>
    </div>
  );

  return (
    <div className="headerContainer">
      <Popover placement="bottom" content={content} trigger="click">
        <div className={"userInfo"}>
          {/* <img
              className={style["avatar"]}
              src={userAvatarPath}
              alt="Avatar"
            /> */}
          <div>
            <label style={{ color: "black" }}>{"Welcome, "}</label>
            <label style={{ color: "black" }}>{localStorage.getItem("username") ?? ""}</label>
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default Header;

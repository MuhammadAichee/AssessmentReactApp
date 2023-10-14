import { Popover } from "antd";
import "./header.index.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };
  const content = (
    <div
      className={"logout-div"}
      onClick={() => {
        logout();
      }}
    >
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
            <label style={{ color: "black" }}>
              {localStorage.getItem("username") ?? ""}
            </label>
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default Header;

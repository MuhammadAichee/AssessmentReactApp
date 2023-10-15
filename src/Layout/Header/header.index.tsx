import { Popover } from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import "./header.index.css";
import { useNavigate } from "react-router-dom";
import Avatar from "Assets/Images/avatar.png"
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
      <PoweroffOutlined/>
      <div style={{marginLeft:"5px"}}>Logout</div>
    </div>
  );

  return (
    <div className="headerContainer">
        <div></div>
      <Popover placement="bottom" content={content} trigger="click" >
        <div className={"userInfo"}>
          <img
              className={"avatar"}
              src={Avatar}
              alt="Avatar"
            />
          <div className="name-info">
            <label className="name-text">{"Welcome, "}</label>
            <br/>
            <label className="name-text">
              {localStorage.getItem("username") ?? ""}
            </label>
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default Header;

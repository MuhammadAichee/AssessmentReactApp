import LoginForm from "./form/loginForm.index";
import "./login.index.css";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;

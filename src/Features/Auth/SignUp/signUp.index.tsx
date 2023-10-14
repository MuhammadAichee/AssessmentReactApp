// import LoginForm from "./form/loginForm.index";
import { useEffect } from "react";
import SignUpForm from "./form/signUpForm.index";
import "./signUp.index.css";
import { useAppDispatch } from "Store/hooks";
import { getAllCountries } from "./redux/thunk";
import { ICountry } from "./redux/types";
const SignUp = () => {
    
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCountries())
      .unwrap()
      .then((response: ICountry[]) => {
        console.log(response);
      });
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <SignUpForm />
      </div>
    </div>
  );
};
export default SignUp;

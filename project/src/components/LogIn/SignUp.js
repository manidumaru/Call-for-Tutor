import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();

  const HideSignUp = () => {
    Navigate("/");
  };
  return <SignUpForm onClose={HideSignUp}></SignUpForm>;
};

export default SignUp;

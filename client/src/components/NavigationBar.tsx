import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="flex justify-center gap-6 text-xl">
      <Link to="sign-in">Log in</Link>
      <Link to="sign-up">Create account</Link>
      <Link to="demo">Demo</Link>
    </nav>
  );
}

export default NavigationBar;

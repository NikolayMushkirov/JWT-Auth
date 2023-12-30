import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="flex justify-center gap-6 text-xl">
      <Link to="sign-in">Вход</Link>
      <Link to="sign-up">Регистрация</Link>
      <Link to="demo">Демо</Link>
    </nav>
  );
}

export default NavigationBar;

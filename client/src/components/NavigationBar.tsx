import { Link } from "react-router-dom";

type Props = {
  isUserLogged: boolean;
};

function NavigationBar({ isUserLogged }: Props) {
  return (
    <>
      {isUserLogged ? (
        <nav className="flex justify-center gap-6 text-xl">
          <Link to="sign-in">Вход</Link>
          <Link to="sign-up">Регистрация</Link>
          <Link to="demo">Демо</Link>
        </nav>
      ) : (
        <nav className="flex justify-center gap-6 text-xl">
          <Link to="sign-in">Вход</Link>
          <Link to="sign-up">Регистрация</Link>
        </nav>
      )}
    </>
  );
}

export default NavigationBar;

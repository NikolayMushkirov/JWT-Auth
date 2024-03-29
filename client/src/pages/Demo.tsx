import { useContext } from "react";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";

function Demo() {
  const { data, handleFetchProtected, handleLogout } = useContext(
    AuthContext
  ) as AuthContext;

  return (
    <div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center">
      <p>{data}</p>
      <Button onClick={handleFetchProtected}>Запрос данных</Button>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
}

export default Demo;

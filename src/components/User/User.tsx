import { Nav } from "../Nav/Nav";
import style from "./User.module.css";

interface UserProps {
  nome?: string;
  email?: string;
}

function User({ nome, email }: UserProps) {
  return (
    <div className={`${style.user} row`}>
        <Nav icon="bi-person-circle"/>
      <div className={style.infos}>
        <h3>{nome ? nome : "Nome não informado"}</h3>
        <p>{email ? email : "E-mail não informado"}</p>
      </div>
    </div>
  );
}

export default User;

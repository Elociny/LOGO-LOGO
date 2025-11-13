import { Nav } from "../Nav/Nav";
import style from "./User.module.css";

interface UserProps {
  nome?: string;
  email?: string;
  foto?: string
  theme?: "light" | "dark"
}

function User({ nome, email, foto, theme = "dark" }: UserProps) {
  return (
    <div className={`${style.user} row ${style[theme]}`}>
      {foto ? (
        <img src={foto} alt={nome || "Foto de perfil"} className={`${style.fotoPerfil}`} />
      ) : (
        <Nav icon="bi-person-circle" />
      )}
      <div className={style.infos}>
        <h3>{nome ? nome : "Nome não informado"}</h3>
        <p>{email ? email : "E-mail não informado"}</p>
      </div>
    </div>
  );
}

export default User;

import styles from "./Nav.module.css";

type NavProps = {
  icon: string;
};

export function Nav({ icon }: NavProps) {
  return (
    <i className={`bi ${icon} ${styles.icon}`}></i>
  );
}

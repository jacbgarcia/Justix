import styles from "./Header.module.css";

function Header({children}) {
    return (
        <header>
            <nav className={styles.navbar}>
      {children}
      <span href="index.html" className={styles.brand}>JUSTIX</span>
    </nav>
        </header>
    );
}

export default Header;
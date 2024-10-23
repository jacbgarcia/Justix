import styles from "./Home.module.css";
import Banner from "../../components/Banner";
import ContainerHome from "../../components/ContainerHome";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import '@fontsource/montserrat/300.css';
import {Link} from "react-router-dom";

function Home() {
  return (      
      <>
      <Header>
      <div className={styles.navleft}>
        <Link to="/cadastro" className={styles.cadastrese}>Cadastre-se</Link>
        <Link to="/login" className={styles.navlinksl}>Login</Link>
        <Link to="/info" className={styles.navlinks}>Sobre nós</Link>
        </div>
      </Header>
      <ContainerHome>
        <section>
          <div className={styles.maincontent}>
        <h1>Bem vindo ao Justix!</h1>
        <p className={styles.description}>
          Aqui você não apenas compartilha sua opinião sobre ações jurídicas você também é recompensado por isso!
          Avalie, contribua com suas análises e adquira isenção de custo no seu próximo processo ao alcançar metas de avaliações.
        </p>
        </div>
        </section>
      <Banner />
      </ContainerHome>
      <Footer />
      </>
  );
}

export default Home;

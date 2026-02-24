import styles from './Home.module.css'
import { Link } from "react-router-dom";
import Button from '../../ui/Button/Button';
const Home = () => {
  return(
    <main className={styles.home}>
      <h1>Wellcome To MUX Caffe</h1>
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
    </main>
  )
}
export default Home;
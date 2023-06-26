import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Please select link below</h1>
      <ul>
        <li>
          <Link to="/keyframes">Keyframes</Link>
        </li>
        <li>
          <Link to="/transition">Transition</Link>
        </li>
        <li>
          <Link to="/scroll-framer-motion">Scroll framer motion</Link>
        </li>
        <li>
          <Link to="/webkit-mask">Webkit mask</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

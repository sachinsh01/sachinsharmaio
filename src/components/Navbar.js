import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'inline-block' }}>SachinSharma.</Link></div>
            <ul className="nav-links">
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/work">WORK</Link></li>
                <li><Link to="/projects">PROJECTS</Link></li>
            </ul>
        </motion.nav>
    );
};

export default Navbar;

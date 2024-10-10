import { VscThreeBars } from 'react-icons/vsc';
import './Logo.css';

const LogoHeader = () => {
  return (
    <div className="logo-container">
      <div className="logobar">
        <img src="logo.jpg" alt="" />
      </div>
      <VscThreeBars className="threebar" />
    </div>
  );
};

export default LogoHeader;

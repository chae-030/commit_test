import CardGroup from './card/CardGroup';
import GroupHeader from './header/GroupHeader';
import LogoHeader from './header/LogoHeader';
import './Group.css';
import Header from '../header/Header';
import Logo from '../header/Logo';

const Group = () => {
  return (
    <div className="app-container">
      <GroupHeader />
      <CardGroup />
    </div>
  );
};

export default Group;

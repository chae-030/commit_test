import CardGroup from './card/CardGroup';
import GroupHeader from './header/GroupHeader';
import LogoHeader from './header/LogoHeader';
import './Group.css';

const Group = () => {
  return (
    <div className="app-container">
      <LogoHeader />
      <GroupHeader />
      <CardGroup />
    </div>
  );
};

export default Group;

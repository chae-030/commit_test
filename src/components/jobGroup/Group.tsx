import CardGroup from './card/CardGroup';
import GroupHeader from './header/GroupHeader';
// import './Group.css';

const Group = () => {
  return (
    <div className="justify-center max-w-lg w-full mx-auto font-GMARKET">
      <GroupHeader />
      <CardGroup />
    </div>
  );
};

export default Group;

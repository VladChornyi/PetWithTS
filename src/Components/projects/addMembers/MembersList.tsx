type TMember = string;

interface IProps {
  members: TMember[];
}

const MembersList = ({ members }: IProps) => {
  return (
    <ul>
      {members?.map((member) => (
        <li key={member}>
          <p className="infoText">{member}</p>
        </li>
      ))}
    </ul>
  );
};

export default MembersList;

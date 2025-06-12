import type { User } from '../../types/User';
import './UserCard.css';

type Props = {
  user: User;
  selected: boolean;
  toogleSelection: (userId: number) => void;
};

export const UserCard = (props: Props) => {
  const { user, selected = false, toogleSelection } = props;
  return (
    <article key={user.id} className="user-card">
      <input
        type="checkbox"
        className="checkbox"
        checked={selected}
        onChange={() => toogleSelection(user.id)}
        title="Select user"
        aria-label={`Select user ${user.login}`}
        aria-checked={selected ? 'true' : 'false'}
      />
      <img
        src={user.avatar_url}
        alt={`Avatar of ${user.login}`}
        className="avatar"
      />
      <div className="user-id">{user.id}</div>
      <div className="username" title={user.login}>
        {user.login}
      </div>
      <div className="view-profile">
        <a
          className="link"
          href={`https://github.com/${user.login}`}
          target="_blank"
        >
          <span className="button">View profile</span>
        </a>
      </div>
    </article>
  );
};

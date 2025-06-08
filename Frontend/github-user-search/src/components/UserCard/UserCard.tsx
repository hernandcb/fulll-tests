import type { User } from '../../types/User';
import './UserCard.css';

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => (
  <article key={user.id} className="user-card">
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

import Button from '../Button/Button';
import './UserCard.css';

const UserCard = ({
  user,
  onEdit,
  onDelete,
  onSetCurrent,
  isCurrent = false
}) => {
  // Destructuring user object
  const {
    id,
    name,
    email,
    role = 'User', // default value
    avatar,
    isActive = true
  } = user;

  return (
    <div className={`user-card ${isActive ? '' : 'inactive'}`}>
      <div className="user-avatar">
        <img
          src={avatar || './assets/user-avatar.png'}
          alt={`${name} avatar`}
        />
        {isActive && <span className="status-indicator"></span>}
      </div>

      <div className="user-info">
        <h3 className="user-name">{name}</h3>
        <p className="user-email">{email}</p>
        <span className={`user-role role-${role.toLowerCase()}`}>
          {role}
        </span>
      </div>

      <div className="user-actions">
        <Button
          variant="secondary"
          size="small"
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
        {isCurrent ? (
          <Button variant="primary" size="small" disabled>
            Current
          </Button>
        ) : (
          <Button variant="primary" size="small" onClick={() => onSetCurrent && onSetCurrent(id)}>
            Set Current
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
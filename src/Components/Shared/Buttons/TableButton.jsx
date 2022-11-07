import { Link } from 'react-router-dom';

const TableButton = ({ path }) => {
  return (
    <Link to={path}>
      <button>
        {'Create '}
        <i className="fa-solid fa-plus"></i>
      </button>
    </Link>
  );
};

export default TableButton;

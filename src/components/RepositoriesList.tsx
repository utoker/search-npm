import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './repositories-list.css';
import './responsive.css';

import src from '../images/search.png';

const RepositoriesList: React.FC = () => {
  const { searchRepositories } = useActions();
  const [term, setTerm] = useState('');
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  const Result = () => (
    <div className="repositories">
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error &&
        !loading &&
        data.map((name) => (
          <div className="repo" key={name}>
            {name}
          </div>
        ))}
    </div>
  );

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="search-bar">
        <input
          name="search-bar"
          type="text"
          placeholder="Search packages, like 'react'"
          className="input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button>
          <img src={src} alt="" />
        </button>
      </form>
      <Result />
    </div>
  );
};

export default RepositoriesList;

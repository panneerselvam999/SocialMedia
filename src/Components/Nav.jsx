import { Link } from "react-router-dom";

export const Nav = ({ search, setSeach }) => {
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search"> Seaarch Posts </label>
        <input
          type="text"
          id="search"
          placeholder="Search Posts"
          value={search}
          onChange={e => setSeach(e.target.value)}
        />
      </form>

      <ul>
        <li><Link to={"/"}>Home</ Link></li>
        <li><Link to={"/post"}>Post</Link></li>
        <li><Link to={"/about"}>About</Link></li>
      </ul>
    </nav>
  );
};

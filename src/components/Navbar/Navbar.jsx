import "./navbar.css";
import logo from "../../assets/logo.png";

const Navbar = ({ openForm, callBackToFilterPlans, query }) => {
  return (
    <nav id="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h1>TravelPlanner</h1>
      </div>
      <div className="nav-right">
        <div id="navbar-search">
          <input
            type="search"
            placeholder="Search a plan..."
            value={query}
            onChange={callBackToFilterPlans}
          />
        </div>
        <div>
          <button onClick={openForm}>Create new plan</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

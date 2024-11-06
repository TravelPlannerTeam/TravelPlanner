import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { IconSearch } from "@tabler/icons-react";

import "./navbar.css";
import logo from "../../assets/logo.png";

const Navbar = ({ openForm, callBackToFilterPlans, query }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (e) {
      console.log("Failed to log out", e);
    }
  };

  return (
    <nav id="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">TravelPlanner</h1>
      </div>
      <div className="nav-right">
        <div id="navbar-search">
        <IconSearch className="search-icon" size={18} color="#5c5656" />
          <input
            type="search"
            placeholder="Search a plan..."
            value={query}
            onChange={callBackToFilterPlans}
          />
        </div>
        <div>
          <Button
            onClick={openForm}
            variant="filled"
            color="yellow"
            size="lg"
            radius="md"
          >
            Create new plan
          </Button>
        </div>
        <div>
          <Button
            onClick={handleLogout}
            variant="subtle"
            color="yellow"
            size="lg"
            radius="md"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

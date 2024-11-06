import { useRef, useState } from "react";
import { Button, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { IconSearch } from "@tabler/icons-react";

import "./navbar.css";
import logo from "../../assets/logo.png";

const Navbar = ({ openForm, callBackToFilterPlans, query }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(); // Burger state
  const [menuVisible, setMenuVisible] = useState(false); // Dropdown menu state
  const burgerRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (e) {
      console.log("Failed to log out", e);
    }
  };

  const toggleMenu = () => setMenuVisible((prev) => !prev); // Toggle dropdown menu visibility

  return (
    <nav id="navbar">
      {/* Dropdown menu for mobile view */}
      {menuVisible && (
        <div className="burger-dropdown">
          <Button
            onClick={openForm}
            variant="filled"
            color="yellow"
            size="md"
            radius="md"
          >
            Create Plan
          </Button>
          <Button
            onClick={handleLogout}
            variant="subtle"
            color="yellow"
            size="md"
            radius="md"
          >
            Logout
          </Button>
        </div>
      )}
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">TravelPlanner</h1>
      </div>
      <div className="nav-right">
        {/* hide searchbar when burger menu is shown */}
        {menuVisible ? null : (
          <div id="navbar-search">
            <IconSearch className="search-icon" size={18} color="#5c5656" />
            <input
              type="search"
              placeholder="Search a plan..."
              value={query}
              onChange={callBackToFilterPlans}
            />
          </div>
        )}
        <div>
          <Burger
            className="burger"
            ref={burgerRef}
            lineSize={3}
            size="md"
            opened={opened}
            onClick={() => {
              toggle();
              toggleMenu();
            }}
            aria-label="Toggle navigation"
          />
        </div>
        <div className="navbar-button">
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
        <div className="navbar-button">
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

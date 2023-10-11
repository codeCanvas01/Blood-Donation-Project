import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Badge} from "@mui/material";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ background: "#262223" }}>
      <Toolbar>
        <BiDonateBlood className="text-[#D94C2A]" />
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1, color: "#D94C2A" }}>
          Blood Bank App
        </Typography>
        <div>
          <p className="flex justify-center items-center gap-1 text-[#D94C2A] font-bold text-2xl mt-1">
            <BiUserCircle /> Welcome{" "}
            {user?.name || user?.hospitalName || user?.organisationName}
            <span style={{ marginLeft: "0.5rem" }}>
              <Badge color="secondary" badgeContent={user?.role} />
            </span>
            &nbsp;
          </p>
        </div>
        {location.pathname === "/" ||
        location.pathname === "/donar" ||
        location.pathname === "/hospital" ? (
          <Link to="/analytics">
            <Button variant="outlined" className="btn">
              Analytics
            </Button>
          </Link>
        ) : (
          <Link to="/" className="nav-link">
            <Button variant="outlined" className="btn">
              Home
            </Button>
          </Link>
        )}
        <Button variant="outlined" className="btn" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

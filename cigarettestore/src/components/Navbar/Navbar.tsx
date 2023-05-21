import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import style from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";

const pages = ["Cigarettes", "Brands", "Clients", "Orders"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElStatistics, setAnchorElStatistics] =
    React.useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenStatisticsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStatistics(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseStatisticsMenu = () => {
    setAnchorElStatistics(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static" className={style.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For larger screens */}

          <SmokingRoomsIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nic Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/" + page.toLocaleLowerCase());
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={handleOpenStatisticsMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Statistics
            </Button>

            <Menu
              id="statistics-menu"
              anchorEl={anchorElStatistics}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElStatistics)}
              onClose={handleCloseStatisticsMenu}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <MenuItem
                key={"price-statistics"}
                onClick={() => {
                  handleCloseStatisticsMenu();
                  navigate("/" + "price-statistics");
                }}
              >
                <Typography textAlign="center">Price Statistics</Typography>
              </MenuItem>

              <MenuItem
                key={"nicotine-statistics"}
                onClick={() => {
                  handleCloseStatisticsMenu();
                  navigate("/" + "nicotine-statistics");
                }}
              >
                <Typography textAlign="center">
                  Average Nicotine Statistics
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* For small screens */}

          <SmokingRoomsIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nic Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/" + page.toLocaleLowerCase());
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
                <MenuItem
                  key={"price-statistics"}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/" + "price-statistics");
                  }}
                >
                  <Typography textAlign="center">Price Statistics</Typography>
                </MenuItem>

                <MenuItem
                  key={"nicotine-statistics"}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/" + "nicotine-statistics");
                  }}
                >
                  <Typography textAlign="center">Nicotine Statistics</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: "white" }}>
                  Sign In
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

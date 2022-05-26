import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import './styles.css';
import { Link } from 'react-scroll';
import logo from '../../../assets/images/logo.png';
import { padding } from '@mui/system';

interface IHeaderLandingPageProps {
}

const HeaderLandingPage: React.FunctionComponent<IHeaderLandingPageProps> = (props) => {
  const [click, setClick] = React.useState<boolean>(false);
  const [navbar, setNavbar] = React.useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const changeBackgroundNav = () => {
    if (window.scrollY > 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }
  window.addEventListener('scroll', changeBackgroundNav);

  return (
    <AppBar position="fixed" color={navbar ? 'inherit' : 'transparent'} sx={{
      boxShadow: 0,
      borderBottom: 0.5,
      borderColor: 'grey.200'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'grey.800',
              textDecoration: 'none',
              ml: 12
            }}
          >
            <img src={logo} alt='logo' height='30px' style={{paddingRight: '5px'}}></img>
            F-HOSTEL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {click ?

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>

              :

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

            }

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item' onClick={handleClick}>
                  <a href='#About'>About</a>
                </li>
                <li className='nav-item' onClick={handleClick}>
                  <a href='#Services'>Services</a>
                </li>
                <li className='nav-item' onClick={handleClick}>
                  <a href='#Contacts'>Contacts</a>
                </li>
              </ul>
            </Box>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'grey.800',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt='logo' height='30px' style={{paddingRight: '5px'}}></img>
            F-HOSTEL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 10 }}>
            <ul className='nav-menu'>
              <li className='nav-item'>
                <Link to="About" spy={true} smooth={true} offset={10} duration={500}>About</Link>
              </li>
              <li className='nav-item'>
                <Link to="Services" spy={true} smooth={true} offset={5} duration={500}>Services</Link>
              </li>
              <li className='nav-item'>
                <Link to="Contacts" spy={true} smooth={true} offset={5} duration={500}>Contacts</Link>
              </li>
            </ul>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderLandingPage;
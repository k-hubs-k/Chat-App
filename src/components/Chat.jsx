import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SendOutlined from "@mui/icons-material/SendOutlined";
import MenuRounded from "@mui/icons-material/MenuRounded";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import Picker from 'emoji-picker-react';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Chat = () => {
  useEffect(()=>{
    document.querySelector(".chatArea").scrollTop = document.querySelector(".chatArea").scrollHeight;
    document.querySelector('.toggs').style.display = 'none';
  }, [])
  const [anchorEl, setAnchorEl] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setmessage] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };
  if (!hidden) {
    document.body.style.backgroundImage = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
  } else {
    document.body.style.backgroundColor = '#85FFBD';
    document.body.style.backgroundImage = 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)';
  }


  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
    switch (!showEmojis) {
      case true:
        document.querySelector('.toggs').style.display = 'block'
        break;
      case false:
        document.querySelector('.toggs').style.display = 'none'
        break;
    }
  };

  return (
    <div className="chat">
      <div className="messages active">
        <div className="searchBox">
          <input type="text" placeholder="Search" />
        </div>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          <NavLink to={"#misterTester"} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          <NavLink to={""} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          <NavLink to={""} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          <NavLink to={""} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          <NavLink to={""} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          <NavLink to={""} className="message">
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Mister tester"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Hello I'm the test
                    </Typography>
                    {"  5min"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </NavLink>
          </List>
      </div>
      <div className="read">
        <div className="userInfo">
          <div className="">
            <Avatar alt="Remy Sharp" src="../../back/public/images/user-default.png" />
          </div>
          <p className="name">Mister tester</p>
          <a href="#">
            <MenuRounded onClick={handleClick} />
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <EditIcon />
                Mark as unread
              </MenuItem>
              <MenuItem disableRipple>
                <FormControlLabel
                  control={
                    <Switch checked={hidden} onChange={handleHiddenChange} color="primary" />
                  }
                />
                dark mode
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
            </StyledMenu>
          </a>
        </div>
        <div className="chatArea">
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            hubs is here Lorem ipsum dolor sit amet, qui minim labore
            adipisicing minim sint cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            ok
          </div>
          <div className="msg you">
            ok
          </div>
        </div>
        <div className="type">
          <span>
            <div className="toggs" style={{position: 'absolute',bottom: '100%',right:0,display:''}}>
              <Picker
                  searchDisabled
                  emojiStyle="twiter"
                  previewConfig={
                    {
                      showPreview: false
                    }
                  }
                  onEmojiClick={(e)=>{
                    setmessage(message=>message+e.emoji)
                  }}
              />
            </div>
            <TagFacesOutlinedIcon onClick={handleShowEmojis} className="tag" />
            <input type="text" placeholder="Message" value={message} onChange={(e)=>{setmessage(e.target.value)}} />
          </span>
          <SendOutlined />
        </div>
      </div>
    </div>
  );
};

export default Chat;


import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ReceiptIcon from '@material-ui/icons/Receipt';

/* import your desired icon from material-ui icons library */
import {NavLink} from 'react-router-dom';


export const publicNavs = [
    {
        url:'/home',
        name:'Dashboard',
        icon:<HomeIcon/>
    },
    {
        url:'/subscriptions',
        name:'Subscriptions',
        icon:<RssFeedIcon />
    },
    {
        url:'/api_keys',
        name:'API Keys',
        icon:<VpnKeyIcon />
    },
    {
        url:'/billing',
        name:'Billing',
        icon:<ReceiptIcon />
    }, 
    // add new Nav links here as a json object, in this file the public navigations
];



export default  ()=>(
publicNavs.map((navItem)=>{
return <NavLink to={navItem.url}  className="NavLinkItem" key={navItem.url} activeClassName="NavLinkItem-selected"> <List component="nav" >  <ListItem button>
          <ListItemIcon className="innernavitem"> 
 {navItem.icon}
          </ListItemIcon>
          <ListItemText primary={navItem.name} className="innernavitem" color="black"/>
        </ListItem></List> </NavLink>
})


     

);






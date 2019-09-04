import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import PublicNavList from '../navs/publicNav'
import PrivateNavList from '../navs/privateNav'
import { logout } from '../store/actions/auth'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 1,
      open: false,
      componentsmenuopen: false
    }
  }

  handleChange = (value) => this.setState({ value });
    onLeftIconButtonClick = () => {
      console.log('hi;')
      this.setState({ open: !this.state.open })
    };

  toggleDrawer = (open) => () => {
    this.setState({
      open: open
    })
  };

  handleClick=() => {
    this.setState({ componentsmenuopen: !this.state.componentsmenuopen })
  };

handleClose = event => {
  if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
    return
  }

  this.setState({ componentsmenuopen: false })
};

 conditRenderEssential =() => this.props.username ? (
   <Button color="inherit" align="right" onClick={this.props.startLogout}> Logout</Button>) : (<Link to="/login"><Button color="inherit" align="right">Login</Button></Link>)

 render () {
   return (
     <div>

       <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} anchor="right" >
         <div
           tabIndex={0}
           role="button"

         >
           <div className="sidelistwrapper">

             {!this.props.username && (<React.Fragment><PublicNavList/></React.Fragment>)}
             {this.props.username && (<React.Fragment><PrivateNavList/></React.Fragment>)}

           </div>
         </div>
       </Drawer>

       <div className="appbarwrapper">

         <AppBar position="static">
           <Toolbar>
             <span color="inherit" className="headertypoclass">
               <Link to='/'><img src={'txgunlogoH.svg'} style={{ marginTop: 4, maxWidth: '80%', maxHeight: '60px' }}/></Link>
             </span>

             <Typography>
               {this.props.username}
             </Typography>

             {
               this.conditRenderEssential()
             }

             <IconButton className="iconbuttonsyle" color="inherit" aria-label="Menu" onClick={this.onLeftIconButtonClick}>
               <MenuIcon />
             </IconButton>
           </Toolbar>
         </AppBar>
       </div>
     </div>
   )
 }
}

const mapStateToProps = (state) => ({
  username: state.auth.username
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

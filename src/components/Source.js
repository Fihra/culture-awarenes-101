import React, { useState } from 'react';
import { literatureURL, essayURL, artURL, musicURL, filmURL, gameURL } from './Links';
import { Drawer, List, ListItem, ListItemText, AppBar } from '@material-ui/core';   
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const Source = () => {
    const [ isMenuOpen, setMenuOpen ] = useState(false);

    const listOfURLs = [literatureURL, essayURL, artURL, musicURL, filmURL, gameURL];

    const showList = () => {
       return listOfURLs.map((url, index) => {
            return (<ListItem button component="a" key={url} href={url}>
                <ListItemText primary={url}/>
            </ListItem>
            )
        })
    };

    return(
        <div>
           <Drawer open={isMenuOpen} onClose={() => setMenuOpen(!isMenuOpen)}>
               <List>
                   {showList()}
               </List>
           </Drawer>
           <AppBar>
               <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={()=> setMenuOpen(true)}
               >
                   Resources used
                <MenuIcon/>
               </IconButton>
           </AppBar>
        </div>
    )
}

export default Source;
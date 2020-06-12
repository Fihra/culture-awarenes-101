import React, { useState } from 'react';
import { literatureURL, essayURL, artURL, musicURL, filmURL, gameURL } from './Links';
import { Drawer, List, ListItem, ListItemText, Link, Button, AppBar } from '@material-ui/core';   
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
            
            {/* <h3>Resources from:</h3>
            <ul>
                <li><a href="https://www.mentalfloss.com/article/532058/books-by-african-american-writers-you-need-to-read" aria-label="Website for books by African American Writers">Books by African American Writers you need to Read</a></li>

                <li><a href="https://blog.pandora.com/us/30-times-black-music-changed-the-world/" aria-label="More information about these Musicians in Black Music">30 Times Black Music changed the World</a></li>

                <li><a href="https://www.ign.com/articles/2019/02/26/games-developed-by-black-developers-you-should-look-out-for" aria-label="Article of the games by Black developers, including video gameplay and footage">Games Developed by Black Developers you should look out for</a></li>

                <li><a href="https://www.bartleby.com/topics/African-American-Essay" aria-label="More African Essays found on this website">African American Essay</a></li>

                <li><a href="https://www.biography.com/news/jean-michael-basquiat-black-artists" aria-label="More information about these Black Visual Artists">Jean Michael Basquiat Black Artists</a></li>

                <li><a href="https://www.blackenterprise.com/hollywoods-most-bankable-black-producers/" aria-label="More information about these Black Film Producers">Hollywood's most Bankable Black Producers</a></li>
            </ul> */}
        </div>
    )
}

export default Source;
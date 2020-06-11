import React, { useEffect } from 'react';
import AuthorCard from './cards/AuthorCard';
import MusicianCard from './cards/MusicianCard';
import GameCard from './cards/GameCard';
import EssayCard from './cards/EssayCard';
import ArtistCard from './cards/ArtistCard';
import FilmCard from './cards/FilmCard';

const Result = (props) => {
    const { currentCategory } = props;
    
    const chooseCategory = () => {
        switch(currentCategory){
            case "Literature":
                return <AuthorCard/>
            case "Music":
                return <MusicianCard/>
            case "Games":
                return <GameCard/>
            case "Essays":
                return <EssayCard/>
            case "Art":
                return <ArtistCard/>
            case "Films":
                return <FilmCard/>
            default:
                return null;
        }
    }
    useEffect(() => {
        chooseCategory();
        return;
    })

    return(
            <div>
                <h1>You selected {currentCategory}</h1>
                {chooseCategory()}
            </div>
    )
}

export default Result;
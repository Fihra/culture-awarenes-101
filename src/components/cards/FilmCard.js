import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { cors, filmURL, randomFilm, randomNumber } from "../Links";

const FilmCard = (props) => {
    const [ data, setData ] = useState(undefined);
    const [ randomNum, setRandomNum ] = useState(0);
    const combinedURL = cors + filmURL;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let newNum = randomNumber(randomFilm);
        setRandomNum(newNum);
        fetchFilm(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [combinedURL])

    const fetchFilm = async (signal) => {
        let tempData = [];

        request (cors + filmURL, signal, (error, resp, html) =>  {  
            if(!error && resp.statusCode === 200){
                const $ = cheerio.load(html);
                $(".penci-entry-content").each((i, elem) => {
                    if(tempData.length >= 10){
                        return;
                    }   

                    let tempNames = [];
                    let tempFilms = [];

                    $(elem).find('h3').each((num, name) => {
                        if(name.childNodes[0] === undefined){
                            return;
                         } else {
                            tempNames.push(name.childNodes[0].children[0].data.substring(3));
                         }
                        
                    });

                    $(elem).find('p').each((num, film) => {
                        if(film.children[0].data === undefined){
                            return;
                        } else if(film.children[0].data === "FILMS:") {
                            tempFilms.push(`FILMS: ${film.children[0].next.next.data}`);
                        }
                        else if(film.children[0].data.includes("FILMS: ")){
                            tempFilms.push(film.children[0].data);
                        }
                        
                    })
                   
                    for(let int = 0; int < tempNames.length; int++){
                        tempData.push({
                            director: {
                                name: tempNames[int],
                                films: tempFilms[int]
                            }
                        })
                    }                       
                })    
                setData(tempData);
            }
        })
    }

    const showDirector = () =>{
        if(data === undefined){
            return null;
        }else {
            const { director } = data[randomNum];
            return `Director: ${director.name}`;
        }
    }

    const showFilms = () => {
        if(data === undefined){
            return null;
        }else {
            const { director } = data[randomNum];
            return director.films;
        }
    }
    
    return(
        <Card className="creator-card"> 
            <CardContent>
                <Typography variant="h5">
                {data === undefined ? <CircularProgress/> : showDirector()}
                </Typography>
                <Typography variant="h7">
                    {showFilms()}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FilmCard;
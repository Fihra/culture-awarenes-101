import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import { cors, musicURL, randomMusic, randomNumber } from "../Links";

const MusicianCard = (props) => {
    const [ data, setData ] = useState(undefined);
    const [ randomNum, setRandomNum ] = useState(0);
    const combinedURL = cors + musicURL;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let newNum = randomNumber(randomMusic);
        setRandomNum(newNum);
        fetchMusician(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [combinedURL])

    const fetchMusician = async (signal) => {
        let tempData = [];

        request (cors + musicURL, signal, (error, resp, html) =>  {  
            if(!error && resp.statusCode === 200){
                const $ = cheerio.load(html);
                $("#currently-reading-content h2").each((i, elem) => {
                    if(tempData.length >= 30){
                        return;
                    }   
                    let name = $(elem).find('a');

                    let checkName;
                    let musicLink;

                    if(name === ""){
                        return;
                    }else if(!name[1]) {
                        checkName = (name[0].children[0].data);
                        musicLink = name[0].attribs.href;
                    } else{
                        checkName = (name[1].children[0].data);
                        musicLink = name[0].attribs.href;
                    }
                    tempData.push({
                        musician: $({
                            name: checkName,
                            music: musicLink
                        })
                    })
                })      
                 setData(tempData);
            }
        })

    }

    const showMusician = () =>{
        if(data === undefined){
            return null;
        }else {
            const { musician } = data[randomNum];
            return `Musician: ${musician[0].name}`;
        }
    }

    const showMusic = () => {
        if(data === undefined){
            return null;
        } else {
            const { musician } = data[randomNum];
            return musician[0].music;
        }
    }
    
    return(
        <Card className="creator-card">
            <CardContent>
                <Typography variant="h5">
                    {data === undefined ? <CircularProgress/> : showMusician()}
                </Typography>
                <Button color="primary" variant="outlined" target="_blank" href={showMusic()}> 
                    Listen on Pandora
                </Button>
            </CardContent>
        </Card>
    )
}

export default MusicianCard;
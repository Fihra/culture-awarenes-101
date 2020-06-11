import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography } from '@material-ui/core';
import { cors, artURL, randomArt, randomNumber } from "../Links";

const ArtistCard = (props) => {
    const [ data, setData ] = useState(undefined);
    const [ randomNum, setRandomNum ] = useState(0);
    const combinedURL = cors + artURL;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let newNum = randomNumber(randomArt);
        setRandomNum(newNum);
        fetchArtist(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [combinedURL])

    const fetchArtist = async (signal) => {
        let tempData = [];

        request (cors + artURL, signal, (error, resp, html) =>  {  
            if(!error && resp.statusCode === 200){
                const $ = cheerio.load(html);
                $(".m-detail--body h2").each((i, elem) => {
                    if(tempData.length >= 10){
                        return;
                    }   
                    let name = $(elem).text();

                    tempData.push({
                        artist: {
                            name: name,
                        }
                    })
                })       
                setData(tempData);
            }
        })

    }

    const showArtist = () =>{
        if(data === undefined){
            return null;
        }else {
            const { artist } = data[randomNum];
            return artist.name;
        }
    }
    
    return(
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Artist: {showArtist()}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ArtistCard;
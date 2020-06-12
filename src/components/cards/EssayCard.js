import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import { cors, essayURL, randomEssay, randomNumber } from "../Links";

const EssayCard = (props) => {
    const [ data, setData ] = useState(undefined);
    const [ randomNum, setRandomNum ] = useState(0);
    const combinedURL = cors + essayURL;
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let newNum = randomNumber(randomEssay);
        setRandomNum(newNum);
        fetchEssay(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [combinedURL])

    const fetchEssay = async (signal) => {
        let tempData = [];

        request (cors + essayURL, signal, (error, resp, html) =>  {  
            
            if(!error && resp.statusCode === 200){
                const $ = cheerio.load(html);
                $("section .card.box-shadow").each((i, elem) => {
                    if(tempData.length >= 7){
                        return;
                    }    
                    let title = $(elem).find("h2").text();
                    let essayLink = $(elem).find("a")[0].attribs.href;
                    tempData.push({
                        essay: {
                            title: title,
                            link: essayLink
                        }     
                    });
                })      
                 setData(tempData);
            }
        })

    }

    const showTitle = () =>{
        if(data === undefined){
            return null;
        }else {
            const { essay } = data[randomNum];
            return `Title: ${essay.title}`;
        }
    }

    const showLink = () => {
        if(data === undefined){
            return null;
        } else{
            const { essay } = data[randomNum];
            return `https://www.bartleby.com${essay.link}`;
        }
    }
    return(
        <Card className="creator-card">
            
            <CardContent>
                <Typography variant="h5">
                    {data === undefined ? <CircularProgress/> : showTitle()}
                </Typography>
                <Button color="primary" variant="outlined" target="_blank" href={showLink()}> 
                    Read this essay
                </Button>
            </CardContent>
            
        </Card>
    )
}

export default EssayCard;
import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography } from '@material-ui/core';
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
            return essay.title;
        }
    }

    const showLink = () => {
        if(data === undefined){
            return null;
        } else{
            const { essay } = data[randomNum];
            return (<a href={`https://www.bartleby.com${essay.link}`}>https://www.bartleby.com{essay.link}</a>);
        }
    }
    return(
        // <div>
        //     <h1>Title: {showTitle()}</h1>
        //     <p>Link: {showLink()} </p>
        // </div>
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Title: {showTitle()}
                </Typography>
                <Typography>
                    Link: {showLink()} 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default EssayCard;
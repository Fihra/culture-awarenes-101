import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import request from 'request';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { cors, literatureURL, randomLiterature, randomNumber } from "../Links";

const AuthorCard = (props) => {
    const [ data, setData ] = useState(undefined);
    const [ randomNum, setRandomNum ] = useState(0);
    const combinedURL = cors + literatureURL;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let newNum = randomNumber(randomLiterature);
        setRandomNum(newNum);
        fetchLiterature(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [combinedURL])

    const fetchLiterature = async (signal) => {
        let tempData = [];

        request (cors + literatureURL, signal, (error, resp, html) =>  {  
            
            if(!error && resp.statusCode === 200){
                const $ = cheerio.load(html);
                $('.article-body h2').each((i, elem) => {
                    if(tempData.length >= 25){
                        return;
                    }    

                    let title = $(elem).text().substring(3);
                    let bookLink = $(elem)[0].children[0].next.attribs.href;
                    
                    tempData.push({
                        author: {
                            title: title,
                            book: bookLink
                        }     
                    });
                })     
                 setData(tempData);
            }
        })

    }

    const showAuthor = () =>{
        if(data === undefined){
            return null;
        }else {
            const { author } = data[randomNum];
            return `Title//Author: ${author.title}`;        
        }
    }

    const showBook = () => {
        if(data === undefined){
            return null;
        } else {
            const { author } = data[randomNum];
            return <a href={author.book} aria-label={author.book}>{author.book}</a>
        }
    }

    return(
        <Card className="creator-card">
            <CardContent>
                <Typography variant="h5">
                    {data === undefined ? <CircularProgress/> : showAuthor()}
                </Typography>
                <Typography>
                    Link: {showBook()}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AuthorCard;
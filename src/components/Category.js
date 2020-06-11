import React, { useState } from 'react';
import Result from './Result';
import {Button, ButtonGroup } from '@material-ui/core';

const categories = ["Literature", "Essays", "Music", "Art", "Games", "Films"];

const Category = () => {

    const [ currentCategory, setCurrentCategory] = useState(null);

    const showCategories = () => {
        return categories.map((category, i) =>{
            return <li className="category-button" aria-label={`${category} button`} key={i}><Button onClick={() => setCurrentCategory(category)}>{category}</Button></li>      
        } )
    }

    return(
        <div>
            <h2>Choose a Category</h2>
                <ButtonGroup variant="outlined" color="primary">
                    <ul className="category-list">
                        {showCategories()}
                    </ul>
                </ButtonGroup>
            {currentCategory === null ? <p>Nothing clicked yet.</p> :    
                <div>
                    <Result currentCategory={currentCategory}/>
                </div>
            }
        </div>
    )
}

export default Category;
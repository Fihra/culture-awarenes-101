import React, { useState } from 'react';
import Result from './Result';
import {Button, ButtonGroup } from '@material-ui/core';

const categories = ["Literature", "Essays", "Music", "Art", "Games", "Films"];

const Category = () => {

    const [ currentCategory, setCurrentCategory] = useState(null);

    const showCategories = () => {
        return categories.map((category, i) =>{
            return <li className="category-item" aria-label={`${category} button`} key={i}><Button color="primary" variant="contained" onClick={() => setCurrentCategory(category)}>{category}</Button></li>      
        } )
    }

    return(
        <div>
            <h2>Choose a Category</h2>
                <ButtonGroup color="primary" aria-label="category buttons">
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
//Cors
export const cors = "https://cors-anywhere.herokuapp.com/";

//Literature
export const literatureURL = "https://www.mentalfloss.com/article/532058/books-by-african-american-writers-you-need-to-read";

//Essay
export const essayURL = "https://www.bartleby.com/topics/African-American-Essay";

//Art
export const artURL = "https://www.biography.com/news/jean-michael-basquiat-black-artists/";

//Music
export const musicURL = "https://blog.pandora.com/us/30-times-black-music-changed-the-world/";

//Film Makers
export const filmURL = "https://www.blackenterprise.com/hollywoods-most-bankable-black-producers/";

//Game
export const gameURL = "https://www.ign.com/articles/2019/02/26/games-developed-by-black-developers-you-should-look-out-for";


export const randomLiterature = 24;
export const randomMusic = 29;
export const randomGame = 7;
export const randomEssay = 6;
export const randomArt = 9;
export const randomFilm = 9;

export const randomNumber = (num) => {
    let newNum = Math.floor((Math.random() * num));
    return newNum;
}
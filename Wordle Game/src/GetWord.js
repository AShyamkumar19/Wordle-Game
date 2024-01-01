// Gets the word for the game

const apiURL = 'https://random-word-api.herokuapp.com/word?length=5';

function fetchData(apiURL) {
    return fetch(apiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log(data);
        return data; // You can modify this to return whatever data you need
      })
      .catch(error => {
        //console.error('There has been a problem with your fetch operation:', error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }

console.log(fetchData(apiURL));
const word = fetchData(apiURL);

//function cleanWord(word) {
        //const finalWord = word.slice(2, -2);
        //return finalWord;
//}


//console.log(cleanWord(word));
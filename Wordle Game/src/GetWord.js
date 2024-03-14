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
        console.log(data);
        const finalWord = JSON.stringify(data);
        const final = finalWord.slice(2, -2);
        console.log(final);
        return final;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
      });
  }

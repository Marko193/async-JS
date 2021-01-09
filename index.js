//Get an API of random dog of a spec breed
//The callback hell problem 
//It`s when too many callbacks inside each other
//should always use ASYNC CODE with PROMISES instead of this

const fs = require('fs');
const superAgent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data)=>{
    console.log(`Breed: ${data}`);

    superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if(err) return console.log(err.message);
        console.log(res.body.message);

        fs.writeFile('dog-image.txt', res.body.message, err =>{
            console.log('Random dog image saved to the file!');
        });
    });
});
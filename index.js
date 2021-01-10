//Get an API of random dog of a spec breed
//The callback hell problem 
//It`s when too many callbacks inside each other
//should always use ASYNC CODE with PROMISES instead of this

const fs = require('fs');
const superagent = require('superagent');

//Promise constructor to find file - promise f() with async work
//Takes in Executor f() - called immediately, when promise is created 
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err){
                reject("File can`t be find!");
            } 
            resolve(data);
    
        });
    });
}

//How to write to file using writeFilePro
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => { 
        fs.writeFile(file, data, err => {
            if (err){
                reject("Couldn`t write to file!");
            } 
            resolve("Succefully written!");
        });
    });
};

//the implement of read file with promise constructor
//without callback hell
readFilePro(`${__dirname}/dog.txt`)
    .then(data =>{
        console.log(`Breed: ${data}`);
        //pending promise in the begining - to get the data
        return superagent
            .get(`https://dog.ceo/api/breed/${data}/images/random`);
    })    
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-image.txt', res.body.message)})
    .then(() =>{
        console.log('Random dog image saved to the file!')})
    .catch(err => {
        console.log(err.message);
    });

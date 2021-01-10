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
};

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

//create async f()
//It keeps run in back when it perform the code while the rest code keep run in the Event Loop
//------------THE ASYNC \ AWAIT PRINCIPLES-----------------------
//stop the code run, wait until the promise will be return
//with its value & then store that value into a var
const getDogPic = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);
    
        await writeFilePro('dog-image.txt', res.body.message);
        console.log('Random dog image saved to the file!');
    }
    catch(err) {
        console.log(err.message);
    }
};

getDogPic();

/*---------------- THE SAME AS BEFORE----------------
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
*/
const { signedCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const fileLeader = require('../modules/fileLeader');
const fs = require('fs');
const now = require('../modules/now');
const jsonsLocation = `jsons/`
const AsyncLock = require('async-lock');

const lock = new AsyncLock({timeout:1000*3});

//http://localhost:3000/vote/:idのミドルウェア群

router.put('/add/:id', async (req, res, next) => {
    lock.acquire('add-lock',async ()=>{
        const questionJson = fileLeader(req.params.id);
        questionJson.questions[0].choices[req.body.id].count++;
        fs.writeFileSync(`${jsonsLocation}\\${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        questionJson.updateAt = now();
        res.send(questionJson);
    },(error,result) =>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
        }
    })
});
router.put('/sub/:id', async (req, res, next) => {
    lock.acquire('sub-lock',async ()=>{
        const questionJson = fileLeader(req.params.id);
        questionJson.questions[0].choices[req.body.id].count--;
        questionJson.updateAt = now();
        fs.writeFileSync(`${jsonsLocation}${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.send(questionJson);
    },(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
        }
    });
})

module.exports = router;
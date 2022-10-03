const { signedCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const fileLeader = require('../moduls/fileLeader');
const fs = require('fs');
const jsonsLocation = `jsons/`
//http://localhost:3000/vote/:idのミドルウェア群

router.put('/add/:id', (req, res, next) => {
    try {
        const questionJson = fileLeader(req.params.id);
        questionJson.questions[0].choices[req.body.id].count++;
        fs.writeFileSync(`${jsonsLocation}\\${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.send(questionJson);
    } catch (err) {
        console.log(err);
    }
});
router.put('/sub/:id', (req, res, next) => {
   
    try {
        const questionJson = fileLeader(req.params.id);
        if (questionJson.questions[0].choices[req.body.id].count > 0) {
            questionJson.questions[0].choices[req.body.id].count--;
        } else {
            throw ("もうゼロだよ");
        }
        fs.writeFileSync(`${jsonsLocation}${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.send(questionJson);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
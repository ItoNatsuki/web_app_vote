const { signedCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const fileLeader = require('../modules/fileLeader');
const fs = require('fs');
const jsonsLocation = `jsons/`
//http://localhost:3000/vote/:idのミドルウェア群

router.put('/add/:id', (req, res, next) => {
    try {
        const questionJson = fileLeader(req.params.id);
        questionJson.questions[0].choices[req.body.id].count++;
        fs.writeFileSync(`${jsonsLocation}\\${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        questionJson.updateAt = now();
        res.send(questionJson);
    } catch (err) {
        res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
    }
});
router.put('/sub/:id', (req, res, next) => {
    
    try {
        const questionJson = fileLeader(req.params.id);
        if (questionJson.questions[0].choices[req.body.id].count > 0) {
            questionJson.questions[0].choices[req.body.id].count--;
            questionJson.updateAt = now();
        } else {
            throw ("もうゼロだよ");
        }
        fs.writeFileSync(`${jsonsLocation}${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.send(questionJson);
    } catch (err) {
        res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
    }
})

module.exports = router;
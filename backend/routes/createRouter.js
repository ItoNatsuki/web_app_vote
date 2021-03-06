const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const fileLeader = require('../moduls/fileLeader');
const createQuestionObj = require('../moduls/createQuestionObj')
const router = express.Router();
const DEFAULT_SETTINGS = {
    "test1": true,
    "test2": true,
    "test3": true
}
//http://localhost:3000/のミドルウェア群
//質問作成
router.post('/create', (req, res, next) => {
    //POSTで送信されたデータをjson形式(オブジェクト)に整形する(expressの内蔵ミドルウェア　express.json())
    //idを生成し、質問データにパラメータとして付与
    const newQuestionsObj = {}
    const questionId = uuidv4();
    newQuestionsObj.questionsId = questionId;

    newQuestionsObj.settings = DEFAULT_SETTINGS;
    newQuestionsObj.questions = [];

    const questionObj = createQuestionObj(req.body);
    newQuestionsObj.questions.push(questionObj);

    //オブジェクトからJSON文字列に変換
    const questionJson = JSON.stringify(newQuestionsObj);
    //ファイル書き込み
    try {
        fs.writeFileSync(`jsons\\${questionId}.json`, questionJson, 'utf8');
        res.send({ questionsId: questionId });
    } catch (err) {
        console.log(err);
    }
});
//GETメソッド(集計状況の確認)
router.get('/:id', (req, res, next) => {
    try {
        const questionJson = fileLeader(req.params.id);
        //httpヘッダーのcontent-typeがjsonで送信される
        res.json(questionJson);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
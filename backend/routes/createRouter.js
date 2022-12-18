const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const fileLeader = require('../modules/fileLeader');
const createQuestionObj = require('../modules/createQuestionObj');
const now = require('../modules/now');
const AsyncLock = require('async-lock');
const router = express.Router();
const DEFAULT_SETTINGS = [
    {"timeLimit": false},
    {"addChoice": false},
    {"multipleChoice": false}
]
const jsonsLocation = `jsons`

const lock = new AsyncLock({timeout:1000*3});

//http://localhost:3000/のミドルウェア群
//質問作成
router.post('/create', async (req, res, next) => {
    //POSTで送信されたデータをjson形式(オブジェクト)に整形する(expressの内蔵ミドルウェア　express.json())
    //idを生成し、質問データにパラメータとして付与

    const newQuestionsObj = {}
    const questionId = uuidv4();
    newQuestionsObj.questionsId = questionId;

    newQuestionsObj.createAt = now();
    newQuestionsObj.updateAt = now();

    newQuestionsObj.settings = DEFAULT_SETTINGS;
    newQuestionsObj.questions = [];

    const questionObj = createQuestionObj(req.body);
    newQuestionsObj.questions.push(questionObj);

    //オブジェクトからJSON文字列に変換
    const questionJson = JSON.stringify(newQuestionsObj);
    //ファイル書き込み

    lock.acquire('create-lock',async()=>{
        fs.writeFileSync(`jsons/${questionId}.json`, questionJson, 'utf8');
        res.send({ questionsId: questionId });
    },(error,result) => {
        if(error){
            console.log(error);
            res.status(400).send("エラー");
        }
    })
    return;
});
//GETメソッド(集計状況の確認)
router.get('/:id', (req, res, next) => {
    try {
        const questionJson = fileLeader(req.params.id);
        //httpヘッダーのcontent-typeがjsonで送信される
        res.json(questionJson);
    } catch (err) {
        res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
    }
});
//DELETEメソッド(質問の削除)
router.delete('/:id',async (req,res,next) =>{

    lock.acquire('delete-lock',async()=>{
        fs.unlinkSync(`jsons/${req.params.id}.json`);
        console.log(`${req.params.id}.jsonを削除しました`)
        res.status(200).send();
    },(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。");
        }
    })
    return;
})
router.put('/addChoice/:id',(req,res,next)=>{
    lock.acquire('addChoice-lock',async()=>{
        const body = req.body;
        const questionJson = fileLeader(req.params.id);
        questionJson.updateAt = now();
        const choices = questionJson.questions[0].choices;
        choices.push({id:choices.length,content:body.content,count:0});
        questionJson.questions[0].choices = choices;
        fs.writeFileSync(`${jsonsLocation}/${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        const NewQuestionJson = fileLeader(req.params.id);
        res.status(200).json(NewQuestionJson);
    },(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。")
        }
    })
    return;
})

router.post('/deadline/:id',(req,res,next)=>{
    lock.acquire('deadline-lock',async()=>{
        const questionJson = fileLeader(req.params.id);
        questionJson.updateAt = now();
        questionJson.questions[0].deadlineFlag = true;
        fs.writeFileSync(`${jsonsLocation}/${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.status(200).send();
    },(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。")
        }
    })
    return;
})

router.put('/setting/addChoice/:id',(req,res,next)=>{
    lock.acquire('setting-addChoice-lock',async()=>{
        const questionJson = fileLeader(req.params.id);
        questionJson.updateAt = now();
        questionJson.settings[1]=req.body;
        fs.writeFileSync(`${jsonsLocation}/${req.params.id}.json`, JSON.stringify(questionJson), 'utf8');
        res.status(200).send();
    }),(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).send("質問データが存在しない。もしくは、既に削除されています。")
            }
    }
    return;
})
module.exports = router;
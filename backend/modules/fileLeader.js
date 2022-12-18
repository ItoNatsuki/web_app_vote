/**
 * jsonsフォルダより該当ファイルを読み取りオブジェクトに変換してから返却します
 * @modules fileLeader
 * @param questionId 質問特定用uuid
 * @return - 質問jsonをオブジェクトで返却
 */


const fs = require('fs');
module.exports = (questionId => {

        const jsonsLocation = `jsons`
        const questionJsonStr = fs.readFileSync(`${jsonsLocation}/${questionId}.json`, 'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        return questionJson;
});

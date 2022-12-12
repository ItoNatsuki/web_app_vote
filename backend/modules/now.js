require('date-utils');
module.exports = ( ()=>{
    const date = new Date();
    const currentTime = date.toFormat('YYYY-MM-DDTHH24:MI:SS+09:00');
    const test = new Date(currentTime);
    return currentTime;
});
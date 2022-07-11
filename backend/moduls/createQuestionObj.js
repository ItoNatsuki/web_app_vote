module.exports=((questionObj=>{
    const choices=[];
    const choiceList = questionObj.choice;
    choiceList.forEach((element,index)=>{
        choices.push({id:index,content:element,count:0});
        questionObj.questionId=0;
    })
    delete questionObj.choice;
    questionObj.deadlineFlag = false;
    questionObj.questionId=0;
    questionObj.choices = choices;
    return questionObj;
}))
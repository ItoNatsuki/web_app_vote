<template>
  <div id="createQuestion">
    <input id="title" type="text" placeholder="質問のタイトル" v-model="title" />
    <div id="choiceList">
      <div v-for="(choiceInput,index) in choiceList" :key="index">
        <input name="content" type="text" :value="choiceInput.choice" @input="addInput($event,index)" />
        <button @click="deleteChoice(index)">削除</button>
      </div>
      <button @click="addChoice">追加</button>
    </div>
    <br />
    <input type="button" value="送信" @click="submitQuestion"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      choiceList: [{ choice: "選択肢1" }, { choice: "選択肢2" }]
    };
  },
  methods: {
    addChoice() {
      const str = "選択肢" + (this.choiceList.length + 1);
      this.choiceList.push({ choice: str });
    },
    deleteChoice(index) {
      this.choiceList.splice(index, 1);
    },
    addInput(e, index) {
      this.choiceList[index].choice = e.target.value;
    },
    submitQuestion(){
      const choice = [];
      this.choiceList.forEach(element => {
        choice.push(element.choice);
      });
      const payload = {
        title:this.title,
        choice:choice
      }
      this.$emit("submitQuestion",payload);
    }
  }
};
</script>
<style scoped>
#createQuestion{
  text-align: center;

}
</style>
<template>
  <div>
    <input id="title" type="text" placeholder="質問のタイトル" v-model="title" />
    <div id="choiceList">
      <div v-for="(choice,index) in choiceList" :key="index">
        <input type="text" :value="choice.value" @input="addInput($event,index)" />
        <button @click="deleteChoice(index)">削除</button>
      </div>
      <button @click="addChoice">追加</button>
    </div>
    <br />
    <input type="button" value="送信" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      choiceList: [{ value: "選択肢1" }, { value: "選択肢2" }]
    };
  },
  methods: {
    addChoice() {
      const str = "選択肢" + (this.choiceList.length + 1);
      this.choiceList.push({ value: str });
    },
    deleteChoice(index) {
      this.choiceList.splice(index, 1);
    },
    addInput(e, index) {
      this.choiceList[index].value = e.target.value;
    }
  }
};
</script>
<style >
input {
  margin: 2%;
}
</style>
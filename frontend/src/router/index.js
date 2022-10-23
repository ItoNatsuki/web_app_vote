import Vue from 'vue'
import Router from 'vue-router'
import createQuestions from '@/components/pages/createQuestions'
import voteQuestion from '@/components/pages/voteQuestion'
import createQuestion from '@/components/pages/createQuestion'
import questionResult from '@/components/pages/questionResult'
import vote from '@/components/pages/vote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'createQuestions',
      component: createQuestions
    },
    {
      path:'/question/vote/:id',
      name: 'voteQuestioner',
      component: voteQuestion,
    },
    {
      path:'/question/:id',
      name:'createQuestion',
      component: createQuestion
    },
    {
      path:'/question/result/:id',
      name:'questionResult',
      component: questionResult
    },
    {
      path:'/vote/:id',
      name:'vote',
      component: vote
    }

  ]
})

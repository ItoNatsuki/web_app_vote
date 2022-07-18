import Vue from 'vue'
import Router from 'vue-router'
import createQuestions from '@/components/view/createQuestions'
import voteQuestion from '@/components/view/voteQuestion'
import createQuestion from '@/components/view/createQuestion'
import vote from '@/components/view/vote'

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
      component: voteQuestion
    },
    {
      path:'/question/:id',
      name:'createQuestion',
      component: createQuestion
    },
    {
      path:'/vote/:id',
      name:'vote',
      component: vote
    }

  ]
})

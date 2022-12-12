import Vue from 'vue'
import Router from 'vue-router'
/*
import createQuestions from '@/components/pages/createQuestions'
import voteQuestion from '@/components/pages/voteQuestion'
import createQuestion from '@/components/pages/createQuestion'
import questionResult from '@/components/pages/questionResult'
import vote from '@/components/pages/vote'
import result from '@/components/pages/result'
*/

const createQuestions = () => import(/* webpackChunkName: createQuestions */ "@/components/pages/createQuestions");
const voteQuestion = () => import(/* webpackChunkName: voteQuestion */ "@/components/pages/voteQuestion");
const createQuestion = () => import(/* webpackChunkName: createQuestion */ "@/components/pages/createQuestion");
const questionResult = () => import(/* webpackChunkName: questionResult */ "@/components/pages/questionResult");
const vote = () => import(/* webpackChunkName: vote */ "@/components/pages/vote");
const result = () => import(/* webpackChunkName: result */ "@/components/pages/result");
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
    },
    {
      path:'/vote/result/:id',
      name:'result',
      component:result
    }

  ]
})

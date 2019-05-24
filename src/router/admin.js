export default [
  {
    path: '/admin',
    component: () => import('../packages/ui/container'),
    children: [
      {
        path: 'questions',
        name: 'questions',
        component: () => import('../view/questions/index'),
      },
      {
        path: 'answerRecord',
        name: 'answerRecord',
        component: () => import('../view/answerRecord/index'),
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('../view/userList/index'),
      } , {
        path: 'teamList',
        name: 'teamList',
        component: () => import('../view/teamList/index'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../view/setting/index'),
      }

      // ,{
      //   path: 'payment',
      //   name: 'payment',
      //   component: () => import('../view/admin/'),
      // }
    ]
  }
]

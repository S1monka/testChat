export default function ({ store, redirect, route }) {
  let { isLogin } = store.state
  if (route.name !== 'chat' && route.name !== 'login') {
    return redirect({ name: 'login' })
  }
  if (route.name == 'chat') {
    if (!isLogin) {
      return redirect({ name: 'login' })
    }
  }
  if (route.name == 'login') {
    if (isLogin) {
      return redirect({ name: 'chat' })
    }
  }
  console.log(route.params)
}

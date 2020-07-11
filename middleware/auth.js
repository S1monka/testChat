import Cookies from 'js-cookie'
export default function ({ store, route, redirect, app }) {
  const { isLogin } = store.state
  if (route.name !== 'chat' && route.name !== 'login') {
    if (isLogin) {
      return redirect({ name: 'chat' })
    } else {
      return redirect({ name: 'login' })
    }
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
}

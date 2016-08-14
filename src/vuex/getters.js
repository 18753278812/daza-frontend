export function auth(state) {
  Object.assign(state.account.auth, {
    check() {
      return this.id !== null && this.id !== 0;
    },
  });
  return state.account.auth;
}

export function auth(state) {
  Object.assign(state.auth, {
    check() {
      return this.id !== null && this.id !== 0;
    },
  });
  return state.auth;
}

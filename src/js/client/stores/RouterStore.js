// Created pursuant to recommendation found at:
//    https://github.com/rackt/react-router/issues/380#issuecomment-58621464
class RouterStore {
    get() {
        return this.router;
    }
    set(router) {
        this.router = router;
    }
}

export default new RouterStore();
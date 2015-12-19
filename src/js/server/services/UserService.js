class UserService {
    requiresLogin() {
        return false;
    }
}

export default new UserService();
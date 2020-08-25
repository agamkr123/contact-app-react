let instane = null;

class SingletonService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.profile = JSON.parse(localStorage.getItem('profile') || "{}");
        this.googleId = "266104191535-algqkui754hvmgvm32fs88pf45udor36.apps.googleusercontent.com";
        this.set = {};
    }

    getInstance() {
        if (instane) {
            return instane;
        } else {
            instane = new SingletonService();
        }
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getProfile() {
        return this.profile;
    }

    setProfile(profile) {
        this.profile = profile;
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    getGoogleId() {
        return this.googleId;
    }

    setGoogleId(googleId) {
        this.googleId = googleId;
    }

    setKey(key, value) {
        this.set[key] = value;
    }

    getKey(key) {
        return this.set[key];
    }
}

export default new SingletonService();
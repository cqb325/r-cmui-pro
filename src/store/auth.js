import {useStrict, observable, action} from 'mobx';
import API, {sleep} from '../configs/api';
import fetch from 'r-cmui/components/utils/fetch';

useStrict(true);

export default class Auth {
    @observable userInfo = null;

    @observable isFetching = false;

    constructor () {
        const token = sessionStorage.getItem('cmui-login-token');
        this.checkValid(token);
    }

    async checkValid (token) {
        const ret = await fetch(API.USER.CHECK, {token});
        if (ret && ret.success) {
            this.setUserInfo(ret.user);
        } else {
            this.setUserInfo(null);
        }
    }

    async login (params) {
        this.beginFetch();
        await sleep(1000);
        const ret = await fetch (API.USER.LOGIN, params, 'POST');

        if (ret.success) {
            this.setUserInfo(ret.user);
            sessionStorage.setItem('cmui-login-token', ret.user.id);
        }
        this.doneFetch();
        return ret;
    }

    async logout () {
        await fetch (API.USER.LOGOUT);
        sessionStorage.setItem('cmui-login-token', undefined);
        this.setUserInfo(null);
    }

    @action
    beginFetch () {
        this.isFetching = true;
    }

    @action
    doneFetch () {
        this.isFetching = false;
    }

    @action
    setUserInfo (user) {
        this.userInfo = user;
    }
}

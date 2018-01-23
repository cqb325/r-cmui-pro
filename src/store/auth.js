import {useStrict, observable, action} from 'mobx';
import API, {sleep} from '../configs/api';
import fetch, {fetchText} from 'r-cmui/components/utils/fetch';

useStrict(true);

export default class Auth {
    @observable userInfo = null;

    @observable isFetching = false;

    @observable verifyCode = null;

    @observable accountId = null;
    @observable findError = null;
    @observable changePasswordError = null;

    constructor () {
        const token = sessionStorage.getItem('cmui-login-token');
        this.checkValid(token);
    }

    async checkValid (token) {
        const ret = await fetch(API.USER.CHECK, {token});
        if (ret && ret.success) {
            this.setUserInfo(ret.user);
        } else {
            // sessionStorage.setItem('cmui-login-token', '');
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

    async registe (params) {
        this.beginFetch();
        const ret = await fetch (API.USER.REGISTE, params, 'POST');
        if (ret.success) {
            this.setUserInfo(ret.user);
            sessionStorage.setItem('cmui-login-token', ret.user.id);
        }
        this.doneFetch();
    }

    async getVerifyCode () {
        const ret = await fetchText (API.USER.VERIFY);
        this.setVerifyCode(ret);
    }

    async checkAccount (params) {
        const ret = await fetch (API.USER.CHECKACCOUNT, params);
        this.setFindAccount(ret);
        return ret;
    }

    async changePassword (params) {
        this.beginFetch();
        const ret = await fetch (API.USER.CHANGEPASSWORD, params);
        this.doneFetch();
        if (ret && !ret.success) {
            this.setChangePasswordError(ret.msg);
        }
        return ret;
    }

    @action
    setChangePasswordError (msg) {
        this.changePasswordError = msg;
    }

    @action
    setFindAccount (ret) {
        if (ret && ret.success) {
            this.accountId = ret.userId;
            this.findError = '';
        } else {
            this.accountId = null;
            this.findError = ret.msg;
        }
    }

    @action
    setVerifyCode (code) {
        this.verifyCode = code;
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

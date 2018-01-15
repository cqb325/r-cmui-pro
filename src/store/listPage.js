import {useStrict, observable, action} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true);

export default class ListPage {
    async agree (id) {
        const ret = await fetch(API.LIST_PAGE.AGREE, {id});
        return ret;
    }

    async reject (id) {
        const ret = await fetch(API.LIST_PAGE.REJECT, {id});
        return ret;
    }

    async offline (id) {
        const ret = await fetch(API.LIST_PAGE.OFFLINE, {id});
        return ret;
    }

    async saveHost (params) {
        const ret = await fetch(API.LIST_PAGE.SAVE_HOST, params, 'post');
        return ret;
    }

    async getHostInfo (id) {
        const ret = await fetch(API.LIST_PAGE.GET_HOST, {id});
        return ret;
    }
}

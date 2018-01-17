import {useStrict, observable, action} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true);

const sleep = function (time) {
    return new Promise(((resolve) => {
        setTimeout(() => {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    }));
};

class BaseForm {
    @observable isFething = false;

    async postData (params) {
        this.fetchBegin();
        const ret = await fetch(API.FORM.SAVE, params, 'post');
        await sleep(1000);
        this.fetchDone();
        return ret;
    }

    @action
    fetchBegin () {
        this.isFething = true;
    }

    @action
    fetchDone () {
        this.isFething = false;
    }
}

export default BaseForm;

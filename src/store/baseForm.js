import {useStrict, observable, action} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true);

class BaseForm {
    @observable isFething = false;

    async postData (params) {
        this.fetchBegin();
        const ret = await fetch(API.FORM.SAVE, params, 'post');
        window.setTimeout(() => {
            this.fetchDone();
        }, 1000);
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

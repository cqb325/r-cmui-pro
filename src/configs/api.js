const HOST = 'http://172.18.34.66:8415/mock/xxl/';
export default {
    SCHEDULE: {
        GETSCHEDULE: `${HOST}/schedule/info`,
        JOBLIST: `${HOST}/job/list`,
        ADDNODE: `${HOST}/success`,
        EDITNODE: `${HOST}/success`,
        DELETENODE: `${HOST}/success`,
        SAVE: `${HOST}/success`,
        GETNODEINFO: `${HOST}/node/info`
    },
    FORM: {
        SAVE: `${HOST}/success`
    },
    LIST_PAGE: {
        AGREE: 'http://172.18.34.66:8415/mock/ops-portal/success',
        REJECT: 'http://172.18.34.66:8415/mock/ops-portal/success',
        OFFLINE: 'http://172.18.34.66:8415/mock/ops-portal/success',
        SAVE_HOST: 'http://172.18.34.66:8415/mock/ops-portal/success',
        GET_HOST: 'http://172.18.34.66:8415/mock/ops-portal/success'
    }
};

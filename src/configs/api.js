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
    },
    USER: {
        LOGIN: 'http://localhost:1204/admin/login',
        CHECK: 'http://localhost:1204/admin/checkLogin',
        LOGOUT: 'http://localhost:1204/admin/logout',
        REGISTE: 'http://localhost:1204/admin/registe',
        VERIFY: 'http://localhost:1204/verify/code',
        CHECKACCOUNT: 'http://localhost:1204/admin/checkAccount',
        CHANGEPASSWORD: 'http://localhost:1204/admin/changePassword'
    }
};

export const sleep = function (time) {
    return new Promise(((resolve) => {
        setTimeout(() => {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    }));
};

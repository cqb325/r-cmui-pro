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
    }
};

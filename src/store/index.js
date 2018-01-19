import { RouterStore } from 'mobx-react-router';
const routingStore = new RouterStore();
import UserStore from './user';
import Monitor from './monitor';
import Dashboard from './dashboard';
import Schedule from './schedule';
import BaseForm from './baseForm';
import ListPage from './listPage';
import Auth from './auth';

const stores = {
    routing: routingStore,
    user: new UserStore(),
    monitor: new Monitor(),
    dashboard: new Dashboard(),
    schedule: new Schedule(),
    baseForm: new BaseForm(),
    listPage: new ListPage(),
    auth: new Auth()
};

export default stores;

import { RouterStore } from 'mobx-react-router';
const routingStore = new RouterStore();
import UserStore from './user';
import Monitor from './monitor';
import Dashboard from './dashboard';
import Schedule from './schedule';
import BaseForm from './baseForm';
import ListPage from './listPage';

const stores = {
    routing: routingStore,
    user: new UserStore(),
    monitor: new Monitor(),
    dashboard: new Dashboard(),
    schedule: new Schedule(),
    baseForm: new BaseForm(),
    listPage: new ListPage()
};

export default stores;

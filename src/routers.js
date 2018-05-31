import React from 'react';
import asyncComponent from './AsyncComponent';
import { Route } from 'react-router-dom';

const routers = [];

const APP = asyncComponent(() => import('./App'));

const DashboardAnalysis = asyncComponent(() => import('./pages/dashboard/analysis'));
const DashboardMonitor = asyncComponent(() => import('./pages/dashboard/monitor'));
const DashboardWorkbench = asyncComponent(() => import('./pages/dashboard/workbench'));
const FormInline = asyncComponent(() => import('./pages/form/inline'));
const FormAdvanced = asyncComponent(() => import('./pages/form/advanced'));
const FormListPage = asyncComponent(() => import('./pages/form/listPage'));
const FormTableForm = asyncComponent(() => import('./pages/form/tableForm'));
const FormTableFormSuccess = asyncComponent(() => import('./pages/form/tableFormSuccess'));
const StepForm = asyncComponent(() => import('./pages/form/stepForm'));
const Error404 = asyncComponent(() => import('./pages/errors/error404'));
const Error500 = asyncComponent(() => import('./pages/errors/error500'));
const Notification = asyncComponent(() => import('./pages/errors/notification'));
const MonitorHost = asyncComponent(() => import('./pages/monitor/host'));
const NodeManager = asyncComponent(() => import('./pages/nodeManager/index'));
const Graph = asyncComponent(() => import('./pages/graph/index'));
const Login = asyncComponent(() => import('./pages/login/index'));
const Success = asyncComponent(() => import('./pages/result/success'));
const ErrorPage = asyncComponent(() => import('./pages/result/error'));
const DetailsBase = asyncComponent(() => import('./pages/details/base'));
const DetailsFormDetails = asyncComponent(() => import('./pages/details/formDetails'));
const Screenshot = asyncComponent(() => import('./pages/screenshot/index'));
const PlatformBlackIntro = asyncComponent(() => import('./pages/welcome/platform-black-intro'));

export const Register = asyncComponent(() => import('./pages/register/index'));
export const FindPassword = asyncComponent(() => import('./pages/findPassword/index'));

export const AppRoute = <Route key='app' path='/' component={APP} />;

routers.push(<Route key='analysis' path='/dashboard/analysis' component={DashboardAnalysis} />);
routers.push(<Route key='monitor' path='/dashboard/monitor' component={DashboardMonitor} />);
routers.push(<Route key='workbench' path='/dashboard/workbench' component={DashboardWorkbench} />);

routers.push(<Route key='forminline' path='/form/inline' component={FormInline} />);
routers.push(<Route key='formadvanced' path='/form/advanced' component={FormAdvanced} />);
routers.push(<Route key='FormListPage' path='/form/listPage' component={FormListPage} />);
routers.push(<Route key='FormTableForm' path='/form/tableForm' component={FormTableForm} />);
routers.push(<Route key='FormTableFormSuccess' path='/form/tableFormSuccess' component={FormTableFormSuccess} />);
routers.push(<Route key='StepForm' path='/form/stepForm' component={StepForm} />);
routers.push(<Route key='Error404' path='/errors/error404' component={Error404} />);
routers.push(<Route key='Error500' path='/errors/error500' component={Error500} />);
routers.push(<Route key='Notification' path='/errors/notification' component={Notification} />);
routers.push(<Route key='list' path='/monitor/host' component={MonitorHost} />);
routers.push(<Route key='futbol-o' path='/nodeManager/index' component={NodeManager} />);
routers.push(<Route key='graph' path='/graph/index' component={Graph} />);
routers.push(<Route key='login' path='/login' component={Login} />);

routers.push(<Route key='success' path='/result/success' component={Success} />);
routers.push(<Route key='error' path='/result/error' component={ErrorPage} />);
routers.push(<Route key='detailsBase' path='/details/base' component={DetailsBase} />);
routers.push(<Route key='DetailsFormDetails' path='/details/formDetails' component={DetailsFormDetails} />);
routers.push(<Route key='Screenshot' path='/screenshot/index' component={Screenshot} />);
routers.push(<Route key='PlatformBlackIntro' path='/welcome/platform-black-intro' component={PlatformBlackIntro} />);

// export const LoginRoute = <Route key='login' path='/login' component={Login} />;

export default routers;

import React from 'react';
import asyncComponent from './AsyncComponent';
import { Route } from 'react-router-dom';

const routers = [];

const DashboardAnalysis = asyncComponent(() => import('./pages/dashboard/analysis'));
const DashboardMonitor = asyncComponent(() => import('./pages/dashboard/monitor'));
const DashboardWorkbench = asyncComponent(() => import('./pages/dashboard/workbench'));
const FormInline = asyncComponent(() => import('./pages/form/inline'));
const FormAdvanced = asyncComponent(() => import('./pages/form/advanced'));
const FormListPage = asyncComponent(() => import('./pages/form/listPage'));
const FormTableForm = asyncComponent(() => import('./pages/form/tableForm'));
const FormTableFormSuccess = asyncComponent(() => import('./pages/form/tableFormSuccess'));
const StepForm = asyncComponent(() => import('./pages/form/stepForm'));
const MonitorHost = asyncComponent(() => import('./pages/monitor/host'));
const NodeManager = asyncComponent(() => import('./pages/nodeManager/index'));
const Graph = asyncComponent(() => import('./pages/graph/index'));

routers.push(<Route key='analysis' path='/dashboard/analysis' component={DashboardAnalysis} />);
routers.push(<Route key='monitor' path='/dashboard/monitor' component={DashboardMonitor} />);
routers.push(<Route key='workbench' path='/dashboard/workbench' component={DashboardWorkbench} />);

routers.push(<Route key='forminline' path='/form/inline' component={FormInline} />);
routers.push(<Route key='formadvanced' path='/form/advanced' component={FormAdvanced} />);
routers.push(<Route key='FormListPage' path='/form/listPage' component={FormListPage} />);
routers.push(<Route key='FormTableForm' path='/form/tableForm' component={FormTableForm} />);
routers.push(<Route key='FormTableFormSuccess' path='/form/tableFormSuccess' component={FormTableFormSuccess} />);
routers.push(<Route key='StepForm' path='/form/stepForm' component={StepForm} />);
routers.push(<Route key='list' path='/monitor/host' component={MonitorHost} />);
routers.push(<Route key='futbol-o' path='/nodeManager/index' component={NodeManager} />);
routers.push(<Route key='graph' path='/graph/index' component={Graph} />);

export default routers;

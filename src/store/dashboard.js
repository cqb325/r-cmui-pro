import {useStrict, observable} from 'mobx';
import Analysis from './dashboard/analysis';
import Monitor from './dashboard/monitor';

useStrict(true);

export default class Dashboard {
    @observable analysis = new Analysis();
    @observable monitor = new Monitor();
}

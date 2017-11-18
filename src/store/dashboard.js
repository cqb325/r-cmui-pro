import {useStrict, observable} from 'mobx';
import Analysis from './dashboard/analysis';

useStrict(true);

export default class Dashboard {
    @observable analysis = new Analysis();
}

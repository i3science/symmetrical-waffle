import { EventEmitter } from 'events';
import { register } from '../dispatcher/dispatcher';

class BaseStore extends EventEmitter {

    constructor() {
        super();
        if (this._listener) {
            this._listener = this._listener.bind(this);
            this._dispatchToken = register(this._listener);
        }
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    emitChange() {
        this.emit('CHANGE');
    }

    addChangeListener(cb) {
        this.on('CHANGE', cb);
    }

    removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
    }

}

export default BaseStore;
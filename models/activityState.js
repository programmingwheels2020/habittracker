class ActivityStore {
    constructor() {
        if (!ActivityStore.instance) {
            this._data = [];
            ActivityStore.instance = this;
        }

        return ActivityStore.instance;
    }

    add(item) {
        this._data.push(item);
    }

    get(id) {
        return this._data.find(d => d.id === id);
    }
}

const instance = new ActivityStore();
Object.freeze(instance);

module.exports = instance;

/*const activityState = {}

const setActivityStateValue = (id, obj) => {
    activityState[id] = { ...activityState[id], obj }
}
const getActivityStateValue = (id, key) => {
    return activityState[id] && typeof activityState[id] == 'object' ? activityState[id][key] : null
}
module.exports = {
    setActivityStateValue,
    getActivityStateValue
}*/
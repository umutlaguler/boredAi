import { FETCH_ACTIVITY, FILL_ACTIVITY_DATA } from "../actions/homeAction";

export interface ActivityItem {
    activity: string;
    accessibility: number;
    type: string;
    participants: number;
    price: number;
    link: string;
    key: string;
}
interface ActivityItemState {
    activityContent: ActivityItem[]
    activityTxt: string
}
interface FetchActivitiesAction {
    type: typeof FETCH_ACTIVITY;
    payload: ActivityItem[];
};
interface FillActivityDataAction {
    type: typeof FILL_ACTIVITY_DATA;
    payload: string
}

const INITIAL_STATE: ActivityItemState = {
    activityContent : [],
    activityTxt: ""
}

const homeReducer = (state = INITIAL_STATE, action: FetchActivitiesAction | FillActivityDataAction) => {
    switch (action.type) {
        case FETCH_ACTIVITY:
            console.log("action.payload",  action.payload)
            return {
                ...state,
                activityContent: action.payload,
            }
        case FILL_ACTIVITY_DATA:
            return {
                ...state,
                activityTxt: action.payload
            }
        default:
            return state;
    }
}
export default (homeReducer);
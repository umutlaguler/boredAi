import { FETCH_ACTIVITY } from "../actions/homeAction";

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
}
interface FetchActivitiesAction {
    type: typeof FETCH_ACTIVITY;
    payload: ActivityItem[];
};

const INITIAL_STATE: ActivityItemState = {
    activityContent : [],
}

const homeReducer = (state = INITIAL_STATE, action: FetchActivitiesAction ) => {
    switch (action.type) {
        case FETCH_ACTIVITY:
            console.log("action.payload",  action.payload)
            return {
                ...state,
                activityContent: action.payload,
            }
        default:
            return state;
    }
}
export default (homeReducer);
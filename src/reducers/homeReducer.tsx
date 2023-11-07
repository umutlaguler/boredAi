import { FETCH_ACTIVITY, FILL_ACTIVITY_DATA, FILL_HISTORY_DATA } from "../actions/homeAction";

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
    historyContent: ActivityItem[]
}
interface FetchActivitiesAction {
    type: typeof FETCH_ACTIVITY;
    payload: ActivityItem[];
};
interface FillActivityDataAction {
    type: typeof FILL_ACTIVITY_DATA;
    payload: string
}
interface FillHistoryDataAction {
    type: typeof FILL_HISTORY_DATA;
    payload: ActivityItem[];
};

const INITIAL_STATE: ActivityItemState = {
    activityContent : [],
    activityTxt: "",
    historyContent: []
}

const homeReducer = (state = INITIAL_STATE, action: FetchActivitiesAction | FillActivityDataAction | FillHistoryDataAction) => {
    switch (action.type) {
        case FETCH_ACTIVITY:
            return {
                ...state,
                activityContent: action.payload,
            }
        case FILL_ACTIVITY_DATA:
            return {
                ...state,
                activityTxt: action.payload
            }
        case FILL_HISTORY_DATA:
            console.log("action.payload HISTORY",  action.payload)
            return {
                ...state,
                historyContent: [...state.historyContent, action.payload]
            }
        default:
            return state;
    }
}
export default (homeReducer);
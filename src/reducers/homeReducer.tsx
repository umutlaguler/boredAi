import { FETCH_ACTIVITY, 
         FILL_ACTIVITY_DATA,
         FILL_HISTORY_DATA,
         DELETE_HISTORY_DATA,
         FETCH_AI_RESPONSE,
         CLEAR_AI_RESPONSE 
        } from "../actions/homeAction";

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
    aiResponse: string
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
interface DeleteHistoryDataAction {
    type: typeof DELETE_HISTORY_DATA;
};
interface ClearAiResponseAction {
    type: typeof CLEAR_AI_RESPONSE;
};
interface FetchAiResponseAction {
    type: typeof FETCH_AI_RESPONSE;
    payload: string
}
const INITIAL_STATE: ActivityItemState = {
    activityContent : [],
    activityTxt: "",
    historyContent: [],
    aiResponse: ""
}

const homeReducer = (state = INITIAL_STATE, action: FetchActivitiesAction | FillActivityDataAction | FillHistoryDataAction | DeleteHistoryDataAction | FetchAiResponseAction | ClearAiResponseAction) => {
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
            return {
                ...state,
                historyContent: [...state.historyContent, action.payload]
            }
        case DELETE_HISTORY_DATA: 
            return {
                ...state,
                historyContent: []
            }
        case FETCH_AI_RESPONSE: 
            console.log("aı cevabı ", action.payload)
            return {
                ...state,
                aiResponse: action.payload
            }
        case CLEAR_AI_RESPONSE:
            return {
                ...state,
                aiResponse: ""
            }
        default:
            return state;
    }
}
export default (homeReducer);
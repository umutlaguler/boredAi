import axios from "axios";
import { Dispatch } from "redux";

export const FETCH_ACTIVITY = "fetch_activites";
export const FILL_ACTIVITY_DATA = "fill_activity_data";
export const FILL_HISTORY_DATA = "fill_history_data";
export const DELETE_HISTORY_DATA = "delete_history_data"
export const FETCH_AI_RESPONSE = "fetch_ai_response";
export const CLEAR_AI_RESPONSE = "clear_ai_response"


import { BASE_API, CHAT_API, AI_API_KEY } from "../constants/config";


export const fetchActivities = (price: number, participants: number, accesibility: number, selectedItem: string) => {
    console.log("price kaç ", price)
    return (dispatch: Dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                url: `${BASE_API}?price=${price.toFixed(1)}&participants=${participants}&accessibility=${accesibility.toFixed(1)}&type=${selectedItem}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((result) => {
                console.log("Gerçekten doğru mu ?", result.data)
                dispatch({
                    type: FETCH_ACTIVITY,
                    payload: result.data
                })
                resolve(result);
            }).catch((err) => {
                console.log("err", err)
                reject(err)
            })
        })
    }
}
export const fetchChatResponse = (activity: string) => {
    console.log("what is our req", activity);
    const requestData = {
        model: 'text-davinci-002', // Buraya model tipini ekleyin
        prompt: activity,
    };
    return (dispatch: Dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                url: `${CHAT_API}`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AI_API_KEY}`,
                },
                data: requestData // İsteği veri olarak ekleyin
            }).then((result) => {
                console.log("deneme BÜYÜKKKK", result.data)
                dispatch({
                    type: FETCH_AI_RESPONSE,
                    payload: result.data.choices[0].text
                });
                resolve(result);
            }).catch((err) => {
                console.log("err", err);
                reject(err);
            });
        });
    };
};


export const fillActivity = (activity: string) => {
    return {
        type: FILL_ACTIVITY_DATA,
        payload: activity
    }
}
export const fillHistoryData = (value: string) => {
    return {
        type: FILL_HISTORY_DATA,
        payload: value
    }
}
export const deleteHistoryData = () => {
    return {
        type: DELETE_HISTORY_DATA,
    }
}
export const clearAiResponse = () => {
    return {
        type: CLEAR_AI_RESPONSE,
    }
}


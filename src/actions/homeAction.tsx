import axios from "axios";
import { Dispatch } from "redux";

export const FETCH_ACTIVITY = "fetch_activites";
import { BASE_API } from "../constants/config";
import { resolve } from "path";

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
                resolve(result); // Promise'i başarıyla çöz
            }).catch((err) => {
                console.log("err", err)
                reject(err)
            })
        })
        
    }
}
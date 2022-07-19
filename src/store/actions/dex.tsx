import { typeOptions } from '@testing-library/user-event/dist/type/typeImplementation';
import { action, PayloadAction } from 'typesafe-actions';

import API from '../../api';
import { 
    ACTION_TYPE_EXCHANGE_SUCCESS, 
    ACTION_TYPE_EXCHANGE_FAILUR,
} from "./types"

export const setExchange = (
    source_currency: string,
    target_crypto_asset_id: string, 
    source_amount: string, 
    target_amount: string,
) => (dispatch:any) => {

    const quotes = {
        "source_currency": source_currency,
        "target_crypto_asset_id": target_crypto_asset_id,
        "source_amount": source_amount,
        "target_amount": target_amount
    };

    /* 
    // This is test code
    dispatch({
        type: ACTION_TYPE_EXCHANGE_SUCCESS,
        payload: {
            sourceCurrency: source_currency,
            targetAmount: source_amount,
            networkFee: "100",
            c14Fee: "10",
            totalFee: "110",
        },
    });
    */

    API.post(`quotes`, { quotes })
    .then((result) => {
        dispatch({
            type: ACTION_TYPE_EXCHANGE_SUCCESS,
            payload: {
                sourceCurrency: source_currency,
                targetAmount: result.data.target_amount,
                networkFee: result.data.fiat_blockchain_fee,
                c14Fee: result.data.absolute_internal_fee,
                totalFee: result.data.total_fee,
            },
        });
    })
    .catch((error) => {
        // console.log(error.code);
        // console.log(error.message);
        dispatch({
            type: ACTION_TYPE_EXCHANGE_FAILUR,
            payload: {
            }
        });
    });
}

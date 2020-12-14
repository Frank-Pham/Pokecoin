import React from 'react'
import RESTConstans from '../../utiels/constans/RESTConstans'


export function useLogin(){

    const login = async () =>{
        const respons = await fetch(RESTConstans.DOMAIN + RESTConstans.LOGIN)
    }

    return null
}
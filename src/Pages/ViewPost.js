import React,{useEffect,useState,useContext } from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'

function ViewPost(props) {
    const [userDetails,setUserDetails] = useState()

    return (
        <div>
            <Header />
            <View/>
        </div>
    )
}

export default ViewPost

import axios from "axios";


const getMonthlyJoined = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/monthly-member',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const threeDayExpire = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/within-3-days-expiring',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const fourSevenDaysexpire = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/within-4-7-days-expiring',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const expired = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/expired-member',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const inActive = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/inactive-member',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export {getMonthlyJoined,threeDayExpire,fourSevenDaysexpire,expired,inActive}
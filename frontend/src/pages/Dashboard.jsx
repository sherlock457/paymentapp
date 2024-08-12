import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [user,setUser]=useState("");

    useEffect(()=>{
        async function func(){
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance);
            setUser(response.data.user.firstName);

        }
        func();
    },[balance]);



    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}
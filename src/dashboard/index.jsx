import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";


const Dashboard = () => {
  const {user} = useUser();
  const [resumeList,setResumeList] = useState([]);
  useEffect(()=>{
    user && GetResumesList();
  },[user])

  const GetResumesList=()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then((resp)=>{
      setResumeList(resp.data.data);

    })
  }
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-bold text-3xl">My Resume</h1>
      <p>Start Creating AI Resume for your next job role</p>
      <div className="grid grid-col-2  md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeItem key={index} resume={resume} refreshData={GetResumesList}/>
        ))}

      </div>
    </div>
  )
}

export default Dashboard
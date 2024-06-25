/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeContext } from "@/context/ResumeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


const SummaryForm = ({enableNext}) => {
    const {resumeInfo,setResumeInfo} = useContext(ResumeContext);
    const [summary,setSummary] = useState();
    const [loading,setLoading] = useState(false);
    const params = useParams();
    
    useEffect(()=>{
        summary && setResumeInfo({
            ...resumeInfo,
            summery: summary
        })
    },[summary])

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
      const data ={
          data: {summery: summary},
      }
      GlobalApi.UpdateResumeDetails(params?.resumeId,data).then((resp)=>{
          console.log(resp);
          enableNext(true);
          setLoading(false)
          toast("Detail Updated")
      },(error)=>{
          setLoading(false)
          console.log(error);
      })

    }
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary Detail</h2>
      <p>Add Summary for you job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button size="sm" variant="outline" className="border-primary text-primary">Generate from AI</Button>
        </div>
        <Textarea className="mt-5" required onChange={(e)=>setSummary(e.target.value)} placeholder=""/>
            <div className="mt-2 flex justify-end">
                <Button disabled={loading} type="submit">
                    {loading ? <Loader2/>: 'Save'}
                </Button>
            </div>
      </form>
    </div>
  );
};

export default SummaryForm;

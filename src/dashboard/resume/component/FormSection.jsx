import { Button } from "@/components/ui/button"
import PersonalDetailForm from "./form/PersonalDetailForm"
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react"
import { useState } from "react"

import SummaryForm from "./form/SummaryForm"


const FormSection = () => {
  const[activeIndex,setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button className="flex gap-2" variant="outline" size="sm"><LayoutGrid/>Theme</Button>
        <div className="flex gap-2">
          {
            activeIndex>1 && <Button size="sm" onClick={()=>setActiveIndex(activeIndex-1)} className="" ><ArrowLeft/></Button>
          }
          <Button onClick={()=>setActiveIndex(activeIndex+1)} disabled={!enableNext} className="flex gap-2" size="sm">Next <ArrowRight/></Button>
          
        </div>
      </div>
      {
        activeIndex == 1 ? <PersonalDetailForm enableNext={(v)=>setEnableNext(v)} /> 
        : activeIndex == 2 ? <SummaryForm enableNext={(v)=>setEnableNext(v)}/> : null
      }
    </div>
  )
}

export default FormSection
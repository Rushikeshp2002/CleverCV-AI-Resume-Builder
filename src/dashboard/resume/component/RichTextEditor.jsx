/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import { Brain, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIchatSession } from "../../../../service/AiModel";
import { toast } from "sonner";

const PROMPT = "position:{positionTitle}, Depending on the position title give me  5-7 bullet points for my experience in resume,give me result in HTML Format and give me the points directly without writing the position and experience thing and no qoutes please, qoutes means "

const RichTextEditor = ({onRichTextEditorChange,index}) => {
  const [value, setValue] = useState();
  const {resumeInfo,setResumeInfo} = useContext(ResumeContext)
  const [loading,setLoading] = useState(false);

  const GenerateSummaryFromaI=async()=>{
    setLoading(true);
    if(!resumeInfo.experience[index].title){
        toast("Please add position title")
        return;
    }
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo?.experience[index]?.title)
    const result = await AIchatSession.sendMessage(prompt);
    console.log(result.response.text())
    const resp = result.response.text()
    setLoading(false);

    setValue(resp.replace('[','').replace(']','').replace('"','').replace('"',''));
  }
  return (
    <div>
        <div className="flex justify-between my-2">
            <label className="text-xs">Summary</label>
            <Button onClick={GenerateSummaryFromaI}  variant="outline" size="sm" className="flex gap-2 border-primary text-primary"><Brain className="h-4 w-4"/>{loading?<Loader2 className="animate-spin"/>:'Generate from AI'}</Button>
        </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnRedo />
            <BtnUndo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnBulletList />
            <BtnNumberedList />
            <Separator />
            <BtnLink/>
            <BtnClearFormatting/>
            <HtmlButton/>
            <Separator/>
            <BtnStyles/>

          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;

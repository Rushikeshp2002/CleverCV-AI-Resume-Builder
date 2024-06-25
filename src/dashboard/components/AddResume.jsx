/* eslint-disable no-unused-vars */

import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    console.log("Data to be sent:", data); // Debugging

    GlobalApi.CreateNewResume(data).then((resp) => {
      console.log("Response:", resp);
      if (resp) {
        setLoading(false);
        navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit')
      }
    }, (error) => {
      console.log("Error:", error); // Debugging
      setLoading(false);
    });
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center  justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-sm cursor-pointer border-dashed border-black"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
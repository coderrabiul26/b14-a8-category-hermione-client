'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { UpcomingEvent } from "@/lib/type";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type TDeleteEventProps = {
  event: UpcomingEvent;
};

const DeleteEvent = ({ event }: TDeleteEventProps) => {

     const router = useRouter();   

    const handleDeleteEvent=async()=>{
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteEvent/${event._id}`, {
            method: 'DELETE',  
        })
        const data= await res.json()
        // redirect('/upcomingEvent')
        router.refresh()

    }
    return (
      <AlertDialog>
      <AlertDialogTrigger render={  <Button className="py-5">
              <Trash2></Trash2>Delete
            </Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteEvent}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default DeleteEvent;
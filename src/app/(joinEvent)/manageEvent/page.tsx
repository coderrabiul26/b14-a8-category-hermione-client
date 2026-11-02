import EventCard from '@/components/home/event-card';
import JoinedEventCard from '@/components/joinedEvent/joined-event-card';
import ManageEventCard from '@/components/manageEvent/manage-event-card';
import { UpcomingEvent } from "@/lib/type";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const ManageEventPae = async() => {

    const session = await auth.api.getSession({
    headers: await headers() 
    })
    const user= session?.user


    const res=await fetch(`http://localhost:5000/createdEvent/${user?.email}`)
    const eventData: UpcomingEvent[] = await res.json()
   
    
    return (
        <div className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
            <h1 className='text-4xl font-bold '>Manage My Events</h1>
            <p>You can view details, edit and delete your event. </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 ">
          
           {
            eventData.map((event)=><ManageEventCard event={event} key={event._id}></ManageEventCard>)
           }
        </div>
        </div>
        
    );
};

export default ManageEventPae;
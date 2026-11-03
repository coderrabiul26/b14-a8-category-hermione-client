import EventCard from '@/components/home/event-card';
import JoinedEventCard from '@/components/joinedEvent/joined-event-card';
import ManageEventCard from '@/components/manageEvent/manage-event-card';
import { UpcomingEvent } from "@/lib/type";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getTokenFromServer } from '@/lib/getTokenFromServer';


const ManageEventPae = async() => {

    const session = await auth.api.getSession({
    headers: await headers() 
    })
    const user= session?.user

    const token = await getTokenFromServer()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createdEvent/${user?.email}`, {
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json()
    if (!Array.isArray(data)) {
        console.error('createdEvent API returned a non-array response:', res.status, data)
    }
    // Error responses (e.g. {"msg":"Unauthorized"}) are not arrays — fall back to an empty list.
    const eventData: UpcomingEvent[] = Array.isArray(data) ? data : []

    return (
        <div className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
            <h1 className='text-4xl font-bold '>Manage My Events</h1>
            <p>You can view details, edit and delete your event. </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 ">
           {
            eventData.map((event)=><ManageEventCard event={event} key={event._id}></ManageEventCard>)
           }
           {
            eventData.length === 0 && (
                <p className="text-muted-foreground">You have no created events yet.</p>
            )
           }
        </div>
        </div>
        
    );
};

export default ManageEventPae;
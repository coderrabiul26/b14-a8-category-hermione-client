import EventCard from '@/components/home/event-card';
import JoinedEventCard from '@/components/joinedEvent/joined-event-card';
import { UpcomingEvent } from '@/lib/type';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { jwt } from 'better-auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

const JoinedEventPae = async() => {

    const session = await auth.api.getSession({
    headers: await headers() 
    })
    const user= session?.user

     const token = await getTokenFromServer()


    const res = await fetch(`http://localhost:5000/joinedEvent/${user?.email}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!Array.isArray(data)) {
        console.error('joinedEvent API returned a non-array response:', res.status, data)
    }
    // Error responses (e.g. {"msg":"Unauthorized"}) are not arrays — fall back to an empty list.
    const joinedEventData: UpcomingEvent[] = Array.isArray(data) ? data : []

    return (
        <div className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
            <h1 className='text-4xl font-bold '>Joined Event</h1>
            <p>welcome! you have joined the following social development campaign. Let us build our society for a better future. </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 ">
          
           {
            joinedEventData.map((event)=><JoinedEventCard event={event} key={event._id}></JoinedEventCard>)
           }
           {
            joinedEventData.length === 0 && (
                <p className="text-muted-foreground">You have not joined any events yet.</p>
            )
           }
        </div>
        </div>
        
    );
};

export default JoinedEventPae;
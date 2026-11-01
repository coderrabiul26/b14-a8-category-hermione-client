import EventCard from '@/components/home/event-card';
import JoinedEventCard from '@/components/joinedEvent/joined-event-card';
import { auth } from '@/lib/auth';
import { Dice1 } from 'lucide-react';
import { headers } from 'next/headers';
import { join } from 'path';

const JoinedEventPae = async() => {

    const session = await auth.api.getSession({
    headers: await headers() 
    })
    const user= session?.user


    const res=await fetch(`http://localhost:5000/joinedEvent/${user?.email} `)
    const joinedEventData= await res.json()
   
    
    return (
        <div className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
            <h1 className='text-4xl font-bold '>Joined Event</h1>
            <p>welcome! you have joined the following social development campaign. Let us build our society for a better future. </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 ">
          
           {
            joinedEventData.map((event)=><JoinedEventCard event={event} key={event._id}></JoinedEventCard>)
           }
        </div>
        </div>
        
    );
};

export default JoinedEventPae;
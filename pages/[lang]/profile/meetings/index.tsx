import React, { useContext, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useQuery, useLazyQuery } from '@apollo/client';
import { AppContext } from './../../../../Context/AppContextProvider';
import { LOAD_MEETINGS, PAST_MEETINGS } from '../../../../query/zoom-meetings'
import { getLocalizationProps } from './../../../../Context/LangContext';

import DatePicker from '../../../../components/common/DatePicker/DatePicker';
import MeetingsTable from '../../../../components/Meetings/MeetingsTable'
import { Layout } from '../../../../components/exports';

const MeetingsPage = () => {
  const [zoomMeetings, setZoomMeetings] = useState<any[]>([])
  const [meetingDates, setMeetingDates] = useState<Date[]>([])
  const { user } = useContext(AppContext)
  const [fetchMeetingsData, { data: pastMeetings }] = useLazyQuery(PAST_MEETINGS, {
    onCompleted() {
      let pastMeets = [...pastMeetings.past_meetings]
      let meetsData = [...zoomMeetings]
      let newMeets: any[] = [];
      let dates: string[] = []
      pastMeets.forEach(meet => {
        meetsData.map(item => {
          if (item.uuid === meet.uuid) {
            let newMeet = {
              ...item,
              start_time: meet.start_time,
              end_time: meet.end_time,
              type: meet.type,
              participants_count: meet.participants_count,
              duration: meet.participants_count
            }
            let newDate = new Date(newMeet?.start_time)
            dates.push(newDate);
            newMeets.push(newMeet)
          }
        })
      });
      setZoomMeetings([...newMeets])
      setMeetingDates([...dates])
      console.log(newMeets);
      console.log(dates)

    },
    onError(error) {
      console.log(error)
    }
  })
  const { data: allMeetings } = useQuery(LOAD_MEETINGS, {
    variables: { user_id: user?.id },
    onCompleted() {
      let zoomData = []
      let zoomUUIDs = []
      let resultingData = [...allMeetings.meetings_aggregate.nodes]
      for (let key in resultingData) {
        zoomUUIDs.push(resultingData[key].zoom_data.uuid)
        zoomData.push(resultingData[key].zoom_data)
      }
      setZoomMeetings([...zoomData])
      fetchMeetingsData({
        variables: { meetingIds: [...zoomUUIDs] }
      })
    },
    onError(err) {
      console.log(err)
    }
  });

  return (
    <Layout>

      <div className="grid grid-cols-6 gap-3 mx-auto my-3 px-10 py-2">
        <DatePicker meetingDates={meetingDates} />
        <div className="mx-auto rounded border shadow-md mt-5 col-span-4 w-full">
          <h2 className="font-semibold text-2xl text-black pl-3 py-8 mb-5 capitalize">
            my scheduled meetings
          </h2>
          <MeetingsTable meetings={zoomMeetings} />
        </div>
      </div>
    </Layout>

  )
}

export default MeetingsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};


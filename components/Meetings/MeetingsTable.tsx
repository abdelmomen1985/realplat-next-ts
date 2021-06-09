import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import moment from 'moment';
const MeetingsTable = ({ meetings }: { meetings: any[] }) => {
  return (
    <>
      {
        meetings.length > 0 &&
        <Table>
          <Tbody>
            {meetings.map(meeting => (
              <Tr key={meeting.uuid}>
                <Td>
                  {meeting.host_email}
                </Td>
                <Td>{moment(meeting.start_time).format('MM/DD/YYYY hh:mm a')}</Td>
                <Td>{moment(meeting.end_time).format('MM/DD/YYYY hh:mm a')}</Td>
                <Td>{meeting.participants_count}</Td>
                <Td>{meeting.topic}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      }
    </>
  )
}

export default MeetingsTable

import { Card, Table, Group, Button, Text } from "@mantine/core";
import { useGetStandbyNextWeekQuery } from "../../api/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function StandbyPage() {
  const { data: standbyEvents = [], isLoading, isError } = useGetStandbyNextWeekQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading standby events</div>;

  const rows = standbyEvents
    .filter(standby => standby.event) // Filter out standbies without events
    .map((standby) => {
      const startTime = standby.event?.start_time 
        ? format(new Date(standby.event.start_time), "MMM dd, yyyy HH:mm")
        : 'N/A';
      
      const endTime = standby.event?.end_time 
        ? format(new Date(standby.event.end_time), "MMM dd, yyyy HH:mm")
        : 'N/A';

      return (
        <Table.Tr key={standby.id}>
          <Table.Td>{startTime}</Table.Td>
          <Table.Td>{endTime}</Table.Td>
          <Table.Td>{standby.event?.location || 'N/A'}</Table.Td>
          <Table.Td>{standby.duration || 'N/A'}</Table.Td>
        </Table.Tr>
      );
    });

  return (
    <Card withBorder shadow="sm" radius="md">
      <Group justify="space-between" mb="md">
        <h3>Standby Events Next Week</h3>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={14} />}
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Group>

      {rows.length === 0 ? (
        <Text ta="center" c="dimmed" py="md">No standby events found</Text>
      ) : (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Start Time</Table.Th>
              <Table.Th>End Time</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Duration</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </Card>
  );
}
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Card, Table, Text, Group, Stack, Space, Button } from "@mantine/core";
import { useGetEventsQuery } from "../../api/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import "@mantine/dates/styles.css";

export default function EventsPage() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2025-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2025-01-31"));
  const navigate = useNavigate();

  const { data: events = [], isLoading } = useGetEventsQuery(
    {
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
    },
    {
      skip: !startDate || !endDate,
    }
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const rows = events.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>
        {format(new Date(event.start_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
      <Table.Td>
        {format(new Date(event.end_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
      <Table.Td>{event.type}</Table.Td>
      <Table.Td>{event.location}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <h3>Events</h3>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={14} />}
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
        </Group>

        <Group grow preventGrowOverflow={false}>
          <DateInput
            label="Start date"
            value={startDate}
            onChange={setStartDate}
            maxDate={endDate || undefined}
            popoverProps={{ withinPortal: true }}
            size="md"
          />
          <DateInput
            label="End date"
            value={endDate}
            onChange={setEndDate}
            minDate={startDate || undefined}
            popoverProps={{ withinPortal: true }}
            size="md"
          />
        </Group>

        <Space h="md" />

        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Start Time</Table.Th>
              <Table.Th>End Time</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Location</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </Card>
  );
}

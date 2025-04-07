import { useState } from "react";
import {
  Tabs,
  TextInput,
  Card,
  Table,
  Group,
  Button,
} from "@mantine/core";
import {
  useGetFlightsNextWeekQuery,
  useGetFlightsFromLocationQuery,
} from "../../api/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function FlightsPage() {
  const [location, setLocation] = useState("JFK");
  const navigate = useNavigate();

  const { data: nextWeekFlights = [], isLoading: isLoadingNextWeek } =
    useGetFlightsNextWeekQuery();
  const { data: flightsFromLocation = [], isLoading: isLoadingFromLocation } =
    useGetFlightsFromLocationQuery(location, {
      skip: !location,
    });

  const nextWeekRows = nextWeekFlights.map((flight) => (
    <Table.Tr key={flight.id}>
      <Table.Td>{flight.flight_number}</Table.Td>
      <Table.Td>{flight.departure_airport}</Table.Td>
      <Table.Td>{flight.arrival_airport}</Table.Td>
      <Table.Td>
        {format(new Date(flight.event.start_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
      <Table.Td>
        {format(new Date(flight.event.end_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
    </Table.Tr>
  ));

  const locationRows = flightsFromLocation.map((flight) => (
    <Table.Tr key={flight.id}>
      <Table.Td>{flight.flight_number}</Table.Td>
      <Table.Td>{flight.departure_airport}</Table.Td>
      <Table.Td>{flight.arrival_airport}</Table.Td>
      <Table.Td>
        {format(new Date(flight.event.start_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
      <Table.Td>
        {format(new Date(flight.event.end_time), "MMM dd, yyyy HH:mm")}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder shadow="sm" radius="md">
      <Group justify="space-between" mb="md">
        <h3>Flights</h3>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={14} />}
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Group>

      <Tabs defaultValue="nextWeek">
        <Tabs.List>
          <Tabs.Tab value="nextWeek">Next Week Flights</Tabs.Tab>
          <Tabs.Tab value="fromLocation">Flights From Location</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="nextWeek" pt="xs">
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Flight Number</Table.Th>
                <Table.Th>Departure</Table.Th>
                <Table.Th>Arrival</Table.Th>
                <Table.Th>Start Time</Table.Th>
                <Table.Th>End Time</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{nextWeekRows}</Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="fromLocation" pt="xs">
          <Group mb="md">
            <TextInput
              placeholder="Enter location (e.g., JFK)"
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
            />
          </Group>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Flight Number</Table.Th>
                <Table.Th>Departure</Table.Th>
                <Table.Th>Arrival</Table.Th>
                <Table.Th>Start Time</Table.Th>
                <Table.Th>End Time</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{locationRows}</Table.Tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

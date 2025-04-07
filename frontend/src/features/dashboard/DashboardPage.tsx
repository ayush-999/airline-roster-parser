import { SimpleGrid, Card, Text, Title, Group } from '@mantine/core';
import { IconPlane, IconCalendarEvent, IconClock, IconUpload } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useGetFlightsNextWeekQuery, useGetStandbyNextWeekQuery } from '../../api/api';

export default function DashboardPage() {
  const { data: flights = [] } = useGetFlightsNextWeekQuery();
  const { data: standby = [] } = useGetStandbyNextWeekQuery();

  return (
    <div>
      <Title order={2} mb="xl">
        Dashboard
      </Title>

      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} mb="xl">
        <Card
          component={Link}
          to="/flights"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ 
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            borderColor: '#e9ecef',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          sx={{
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#e9f5ff',
              borderColor: '#d0ebff'
            }
          }}
        >
          <Group>
            <IconPlane size={40} color="#228be6" />
            <div>
              <Text size="sm" color="dimmed">
                Flights Next Week
              </Text>
              <Text size="xl" weight={700} color="#228be6">
                {flights.length}
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          component={Link}
          to="/standby"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ 
            cursor: 'pointer',
            backgroundColor: '#fff9f9',
            borderColor: '#ffe3e3',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          sx={{
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff0f0',
              borderColor: '#ffd6d6'
            }
          }}
        >
          <Group>
            <IconClock size={40} color="#fa5252" />
            <div>
              <Text size="sm" color="dimmed">
                Standby Next Week
              </Text>
              <Text size="xl" weight={700} color="#fa5252">
                {standby.length}
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          component={Link}
          to="/events"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ 
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            borderColor: '#e9ecef',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          sx={{
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f3f0ff',
              borderColor: '#e5dbff'
            }
          }}
        >
          <Group>
            <IconCalendarEvent size={40} color="#7950f2" />
            <div>
              <Text size="sm" color="dimmed">
                All Events
              </Text>
              <Text size="xl" weight={700} color="#7950f2">
                View
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          component={Link}
          to="/upload"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ 
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            borderColor: '#e9ecef',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          sx={{
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ebfbee',
              borderColor: '#d3f9d8'
            }
          }}
        >
          <Group>
            <IconUpload size={40} color="#40c057" />
            <div>
              <Text size="sm" color="dimmed">
                Upload Roster
              </Text>
              <Text size="xl" weight={700} color="#40c057">
                New
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>
    </div>
  );
}
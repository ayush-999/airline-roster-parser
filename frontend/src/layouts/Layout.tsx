import { AppShell, Text, NavLink, Container} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import {
  IconUpload,
  IconCalendarEvent,
  IconPlane,
  IconClock,
} from "@tabler/icons-react";

export default function Layout() {
  return (
    <>
      <Container size="lg">
      <AppShell
        padding="md"
        navbar={
          <AppShell.Navbar p="xs">
            <NavLink
              label="Dashboard"
              component={Link}
              to="/"
              icon={<IconPlane size="1rem" />}
            />
            <NavLink
              label="Upload Roster"
              component={Link}
              to="/upload"
              icon={<IconUpload size="1rem" />}
            />
            <NavLink
              label="Events"
              component={Link}
              to="/events"
              icon={<IconCalendarEvent size="1rem" />}
            />
            <NavLink
              label="Flights"
              component={Link}
              to="/flights"
              icon={<IconPlane size="1rem" />}
            />
            <NavLink
              label="Standby"
              component={Link}
              to="/standby"
              icon={<IconClock size="1rem" />}
            />
          </AppShell.Navbar>
        }
        header={
          <AppShell.Header p="xs">
            <Text size="xl" weight="bold">
              Airline Roster Management
            </Text>
          </AppShell.Header>
        }
      >
        <Outlet />
      </AppShell>
      </Container>
    </>
  );
}

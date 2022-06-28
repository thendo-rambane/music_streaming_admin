import { AppShell, Navbar, Header } from "@mantine/core";
import MainLinks from "./components/MainLink";
import { Routes, Route } from "react-router-dom";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";

function App() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <h1>World</h1>
        </Header>
      }
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.white,
        },
      })}
    >
      <Routes>
        <Route path="/albums/*" element={<Albums />} />
        <Route path="/artists/*" element={<Artists />} />
      </Routes>
    </AppShell>
  );
}
export default App;

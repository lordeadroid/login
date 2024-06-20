import "./App.css";
import { MantineProvider, Text } from "@mantine/core";

const App = (): React.JSX.Element => {
  return (
    <MantineProvider>
      <Text size="xl" fw={800}>
        login
      </Text>
    </MantineProvider>
  );
};

export default App;

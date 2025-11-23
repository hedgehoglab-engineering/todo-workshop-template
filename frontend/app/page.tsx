import { Stack, Container, Text } from "@mantine/core";
import { TodoList } from "./list";
import { TodoInput } from "./input";

export default function Home() {

  // Initial list
  // [variable to set, function = useState(start value)]
  const initialItems = [
    "Loading..."
  ];

  return (
    <Container w="100%">
      <Stack spacing="md" pt={10}>
        <TodoList initialItems={initialItems} />
        <TodoInput />  {/* fullWidth will now work correctly */}
      </Stack>
    </Container>
  );
}

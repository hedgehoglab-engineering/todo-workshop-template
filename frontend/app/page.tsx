import { Center, Container, Text } from "@mantine/core";
import { TodoList } from "./list"; // adjust path if needed

export default function Home() {

  // Initial list
  // [variable to set, function = useState(start value)]
  const initialItems = [
    "Loading..."
  ];

  return (
    <Container w='100%' >
      <Center pt={10}>
        <Text px={5} size='xl' >
        </Text>
        <TodoList test="Todo" initialItems={initialItems}></TodoList>
      </Center>
    </Container>
  );
}

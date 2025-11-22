import { Center, Container, Text } from "@mantine/core";
import { TodoList } from "./list"; // adjust path if needed

export default function Home() {
  return (
    <Container w='100%' >
      <Center pt={10}>
        <Text px={5} size='xl' >
        </Text>
        <TodoList test="Todo"></TodoList>
      </Center>
    </Container>
  );
}

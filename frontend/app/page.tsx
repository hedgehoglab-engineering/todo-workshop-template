import { Center, Container, Text } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";
import { TodoList } from "./list"; // adjust path if needed

export default function Home() {
  return (
    <Container w='100%' >
      <Center pt={10}>
        <IconRocket/>
        <Text px={5} size='xl' >
        </Text>
        <TodoList></TodoList>
        <IconRocket/>
      </Center>
    </Container>
  );
}

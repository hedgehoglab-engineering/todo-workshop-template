import { Center, Container, Text } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";
import {TextInput} from './input';

export default function Home() {
  return (
    <Container w='100%' >
      <Center pt={10}>
        <IconRocket/>
        <Text px={5} size='xl' >
          Your todo app goes here!
        </Text>
        
        <IconRocket/>
      </Center>
      <TextInput></TextInput>
    </Container>
  );
}

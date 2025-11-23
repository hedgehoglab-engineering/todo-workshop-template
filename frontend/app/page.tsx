"use client";

import { useState } from "react";
import { Stack, Container } from "@mantine/core";
import { TodoList } from "./list";
import { TodoInput } from "./input";

export default function Home() {
  // Define items in the state and the setItems function to update it
  const [items, setItems] = useState<string[]>([]);

  return (
    <Container w="100%">
      <Stack pt={10}>
        <TodoList items={items} setItems={setItems} />
        <TodoInput items={items} setItems={setItems} />
      </Stack>
    </Container>
  );
}

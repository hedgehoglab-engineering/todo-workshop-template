"use client";

import { useState } from "react";
import { Stack, Container } from "@mantine/core";
import { TodoList } from "./list";
import { TodoInput } from "./input";

export default function Home() {
  // Define items in the state and the setItems function to update it
  const [items, setItems] = useState<string[]>([]);

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Stack>
        <TodoList items={items} setItems={setItems} />
        <TodoInput items={items} setItems={setItems} />
      </Stack>
    </Container>
  );
}

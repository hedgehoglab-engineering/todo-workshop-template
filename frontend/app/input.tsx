import { TextInput } from '@mantine/core';

export function TodoInput() {
  return (
    <TextInput
      size="lg"
      radius="xl"
      label="Add todo item"
      description="Let's get this done"
      placeholder="Input placeholder"
    />
  );
}
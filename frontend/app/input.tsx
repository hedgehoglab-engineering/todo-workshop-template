import { TextInput , ActionIcon , Group } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

export function TodoInput() {
  return (
    <>
    <Group align="flex-end" >
    <TextInput
      size="lg"
      radius="xl"
      label="Add todo item"
      description="Let's get this done"
      placeholder="Input placeholder"
    />
    
    <ActionIcon variant="filled" color="red" size="xl" radius="xl" aria-label="Submit">
      <IconCircleCheck />
    </ActionIcon>
    </Group></>
  );
}
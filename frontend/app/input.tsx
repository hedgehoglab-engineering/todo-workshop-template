import { TextInput , ActionIcon , Group } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';

// We only really need interfaces if we're being strict about types
// Which maybe we should be!
// Note should probably move this to a central location and import it.
interface TodoInputProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

// define items as an array of strings, and setItems as a function
export function TodoInput ({ items, setItems }: TodoInputProps) {

  // Give the input box a state
  const [todoText, setText] = useState<string>("");

  // Function to add a new item
  const addNew = () => {
    // Add a new item to the list
    // [...items, "Hello"] is the same as items.push("Hello") but returns a new array
    setItems([...items, todoText]);
  }

  // Note how TextInput's value is linked to todoText and onChange updates todoText
  return (
    <>
    <Group align="flex-end" >
    <TextInput
      size="lg"
      radius="xl"
      label="Add todo item"
      description="Let's get this done"
      placeholder="Input placeholder"
      value={todoText}
      onChange={(event) => setText(event.currentTarget.value)}
    />
    
    <ActionIcon variant="filled" color="red" size="xl" radius="xl" aria-label="Submit" onClick={addNew}>
      <IconCircleCheck />
    </ActionIcon>
    </Group></>
  );
}
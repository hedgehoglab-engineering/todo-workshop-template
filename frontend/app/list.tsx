'use client';

import { useState } from 'react';
import { Table, Button } from '@mantine/core';

export function TodoList ({initialItems}) {

  // Initial state
  // [variable to set, function = useState(start value)]
  const [items, setItems] = useState(initialItems);

    const markDone = (index) => {
        // Item[index] is done, remove it
        // Filter runs over each element in the array
        // items.filter((val,idx) => function body which returns true or false per element)
        setItems(items.filter((val,idx) => idx !== index));
    }

  const rows = items.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index}</Table.Td>
      <Table.Td>{item}</Table.Td>
      <Table.Td><Button key={index} onClick={() => markDone(index)}>Done</Button></Table.Td>
    </Table.Tr>
  ));

  return (
    <><Table>
          <Table.Thead>
              <Table.Tr>
                  <Table.Th>Item #</Table.Th>
                  <Table.Th>Todo item</Table.Th>
                  <Table.Th></Table.Th>
              </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
      </Table></>
  );
}
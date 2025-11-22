'use client';

import { Table } from '@mantine/core';

const items = [
  "Take out trash",
  "Buy more trash",
  "Recycle."
];

export function TodoList () {
  const rows = items.map((item, index) => (
    <Table.Tr>
      <Table.Td>{++index}</Table.Td>
      <Table.Td>{item}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Item #</Table.Th>
          <Table.Th>Todo item</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
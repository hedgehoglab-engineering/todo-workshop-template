'use client';

import { Table, Button } from '@mantine/core';

const items = [
  "Take out trash",
  "Buy more trash",
  "Recycle."
];

export function TodoList (props) {
  const rows = items.map((item, index) => (
    <Table.Tr key={++index}>
      <Table.Td>{++index}</Table.Td>
      <Table.Td>{item}</Table.Td>
      <Table.Td><Button key={++index}>Done</Button></Table.Td>
    </Table.Tr>
  ));

  return (
    <><h1>{props.test}</h1><Table>
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
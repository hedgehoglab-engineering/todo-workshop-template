'use client';

import { useEffect } from 'react';
import { Table, Button } from '@mantine/core';
import styles from './TodoList.module.css';

interface TodoListProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TodoList({ items, setItems }: TodoListProps) {

  // useEffect - runs stuff when things change

  useEffect(() => {
    const stored = window.localStorage.getItem("todo-items");
    if (stored) setItems(JSON.parse(stored));
  }, []); // Empty array - run on initial load only

  useEffect(() => {
    window.localStorage.setItem("todo-items", JSON.stringify(items));
  }, [items]); // Run every time items changes

  const markDone = (index) => {
    // Item[index] is done, remove it
    // Filter runs over each element in the array
    // items.filter((val,idx) => function body which returns true or false per element)
    setItems(items.filter((val, idx) => idx !== index));
  }

  const rows = items.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index}</Table.Td>
      <Table.Td>{item}</Table.Td>
      <Table.Td><Button className={styles.bouncyButton} key={index} onClick={() => markDone(index)}>Done</Button></Table.Td>
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
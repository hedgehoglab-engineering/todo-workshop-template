"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Alert,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const API_BASE = `${BACKEND_BASE}/api/v1`;

type TodoPayload = {
  name: string;
  description: string;
  isCompleted: boolean;
};

type Todo = TodoPayload & {
  id: string;
};

type Draft = {
  name: string;
  description: string;
};

async function fetchTodoById(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE}/todo/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load todo details");
  }

  const payload: TodoPayload = await response.json();
  return { id, ...payload };
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<Draft>({ name: "", description: "" });

  const hasTodos = todos.length > 0;

  const loadTodos = async () => {
    setError(null);
    setLoading(true);

    try {
      const idResponse = await fetch(`${API_BASE}/todos`);

      if (!idResponse.ok) {
        throw new Error("Unable to load todo ids");
      }

      const ids: string[] = await idResponse.json();
      const fetched = await Promise.all(ids.map((id) => fetchTodoById(id)));
      setTodos(fetched);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTodos();
  }, []);

  useEffect(() => {
    setDrafts((previous) => {
      const next = { ...previous };

      todos.forEach((todo) => {
        if (!next[todo.id]) {
          next[todo.id] = {
            name: todo.name,
            description: todo.description,
          };
        }
      });

      return next;
    });
  }, [todos]);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Please give the todo a name");
      return;
    }

    setError(null);
    setCreating(true);

    try {
      const response = await fetch(`${API_BASE}/todo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create todo");
      }

      const id = await response.text();
      const newTodo = await fetchTodoById(id);
      setTodos((previous) => [...previous, newTodo]);
      setForm({ name: "", description: "" });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const handleSave = async (todo: Todo) => {
    const draft = drafts[todo.id];
    if (!draft) {
      return;
    }

    setSavingId(todo.id);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/todo/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          description: draft.description,
          isCompleted: todo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save todo");
      }

      const payload: TodoPayload = await response.json();
      const updated: Todo = { id: todo.id, ...payload };
      setTodos((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item))
      );
      setDrafts((previous) => ({
        ...previous,
        [updated.id]: {
          name: updated.name,
          description: updated.description,
        },
      }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete todo");
      }

      setTodos((previous) => previous.filter((todo) => todo.id !== id));
      setDrafts((previous) => {
        const next = { ...previous };
        delete next[id];
        return next;
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleCompletion = async (todo: Todo) => {
    const draft = drafts[todo.id];
    if (!draft) {
      return;
    }

    setSavingId(todo.id);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/todo/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          description: draft.description,
          isCompleted: !todo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update completion");
      }

      const payload: TodoPayload = await response.json();
      const updated: Todo = { id: todo.id, ...payload };
      setTodos((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item))
      );
      setDrafts((previous) => ({
        ...previous,
        [updated.id]: {
          name: updated.name,
          description: updated.description,
        },
      }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDraftChange = (
    id: string,
    field: keyof Draft,
    value: string
  ) => {
    setDrafts((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        [field]: value,
      },
    }));
  };

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  }, [todos]);

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={1}>Todos</Title>
          <Text size="sm" c="dimmed">
            Talking to backend at {BACKEND_BASE}
          </Text>
        </Stack>

        {error && <Alert c="red">{error}</Alert>}

        <Paper p="md" shadow="sm" radius="md" withBorder>
          <form onSubmit={handleCreate}>
            <Stack gap="sm">

              <Group align="flex-end" grow>
                <TextInput
                  label="Name"
                  placeholder="Write what needs doing"
                  value={form.name}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  required
                />
              </Group>

              <Textarea
                label="Details"
                placeholder="Add a short description"
                value={form.description}
                minRows={2}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
              />

              <Button
                type="submit"
                leftSection={<IconPlus size={18} />}
                loading={creating}
              >
                Create todo
              </Button>
            </Stack>
          </form>
        </Paper>

        <Stack gap="sm">

          {loading ? (
            <Center py="xl">
              <Loader />
            </Center>
          ) : hasTodos ? (
            sortedTodos.map((todo) => {
              const draft = drafts[todo.id];
              return (
                <Paper key={todo.id} p="md" radius="md" withBorder shadow="xs">
                  <Stack gap="sm">

                    <Group justify="space-between" align="center">
                      <Group align="center" gap="xs">
                        <Checkbox
                          checked={todo.isCompleted}
                          onChange={() => void handleToggleCompletion(todo)}
                          radius="xs"
                        />
                        <Text fw={600}>{draft?.name ?? todo.name}</Text>
                      </Group>

                      <Group gap="xs">

                        <ActionIcon
                          c="green"
                          disabled={savingId === todo.id}
                          onClick={() => void handleSave(todo)}
                        >
                          <IconCheck size={18} />
                        </ActionIcon>
                        <ActionIcon
                          c="red"
                          disabled={deletingId === todo.id}
                          onClick={() => void handleDelete(todo.id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Group>

                    <TextInput
                      value={draft?.name ?? todo.name}
                      onChange={(event) =>
                        handleDraftChange(todo.id, "name", event.target.value)
                      }
                      label="Name"
                      disabled={savingId === todo.id || deletingId === todo.id}
                    />

                    <Textarea
                      value={draft?.description ?? todo.description}
                      minRows={2}
                      label="Details"
                      onChange={(event) =>
                        handleDraftChange(todo.id, "description", event.target.value)
                      }
                      disabled={savingId === todo.id || deletingId === todo.id}
                    />
                  </Stack>
                </Paper>
              );
            })
          ) : (
            <Text c="dimmed" ta="center">
              No todos yet — add your first one.
            </Text>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

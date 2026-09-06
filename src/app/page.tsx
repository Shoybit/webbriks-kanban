"use client";

import { useEffect, useState } from "react";
export default function Home() {
  const [boards, setBoards] = useState<
    { id: string; name: string }[]
  >([]);

  const [columns, setColumns] = useState<
  { id: string; name: string; position: number }[]
>([]);

const [tasks, setTasks] = useState<
  {
    id: string;
    title: string;
    description: string | null;
    position: number;
    columnId: string;
  }[]
>([]);

const [showBoardForm, setShowBoardForm] = useState(false);
const [boardName, setBoardName] = useState("");
const [selectedBoardId, setSelectedBoardId] = useState("");
const [showColumnForm, setShowColumnForm] = useState(false);
const [columnName, setColumnName] = useState("");
const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
const [editingColumnName, setEditingColumnName] = useState("");
const [showTaskForm, setShowTaskForm] = useState(false);
const [taskTitle, setTaskTitle] = useState("");
const [taskColumnId, setTaskColumnId] = useState("");
const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
const [editingTaskTitle, setEditingTaskTitle] = useState("");
const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
const [editingBoardName, setEditingBoardName] = useState("");
const [showShareForm, setShowShareForm] = useState(false);
const [shareEmail, setShareEmail] = useState("");

const handleCreateBoard = async () => {
  const token = localStorage.getItem("token");

  if (!token || !boardName.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: boardName.trim(),
        }),
      }
    );

    const data = await response.json();
    console.log("Create board response:", data);
    if (!response.ok) {
      throw new Error(data.message || "Failed to create board");
    }

    setBoards((currentBoards) => [data, ...currentBoards]);
    setSelectedBoardId(data.id);
    setBoardName("");
    setShowBoardForm(false);
  } catch (error) {
    console.error("Failed to create board:", error);
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

const handleCreateColumn = async () => {
  const token = localStorage.getItem("token");

  if (!token || !selectedBoardId || !columnName.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/columns/${selectedBoardId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: columnName.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create column");
    }

    setColumns((currentColumns) => [...currentColumns, data.column]);
    setColumnName("");
    setShowColumnForm(false);
  } catch (error) {
    console.error("Failed to create column:", error);
  }
};

const handleDeleteColumn = async (columnId: string) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/columns/${columnId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete column");
    }

    setColumns((currentColumns) =>
      currentColumns.filter((column) => column.id !== columnId)
    );
  } catch (error) {
    console.error("Failed to delete column:", error);
  }
};

const handleUpdateColumn = async () => {
  const token = localStorage.getItem("token");

  if (!token || !editingColumnId || !editingColumnName.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/columns/${editingColumnId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingColumnName.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update column");
    }

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === editingColumnId ? data.column : column
      )
    );

    setEditingColumnId(null);
    setEditingColumnName("");
  } catch (error) {
    console.error("Failed to update column:", error);
  }
};

const handleCreateTask = async () => {
  const token = localStorage.getItem("token");

  if (!token || !taskColumnId || !taskTitle.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskColumnId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: taskTitle.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create task");
    }

    setTasks((currentTasks) => [...currentTasks, data.task]);

    setTaskTitle("");
    setTaskColumnId("");
    setShowTaskForm(false);
  } catch (error) {
    console.error("Failed to create task:", error);
  }
};

const handleDeleteTask = async (taskId: string) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete task");
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

const handleUpdateTask = async () => {
  const token = localStorage.getItem("token");

  if (!token || !editingTaskId || !editingTaskTitle.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${editingTaskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingTaskTitle.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update task");
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTaskId ? data.task : task
      )
    );

    setEditingTaskId(null);
    setEditingTaskTitle("");
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const handleDeleteBoard = async () => {
  const token = localStorage.getItem("token");

  if (!token || !selectedBoardId) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/${selectedBoardId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

if (!response.ok) {
  const data = await response.json();
  throw new Error(data.message || "Failed to delete board");
}

    console.log("Before delete:", boards);
console.log("Selected board:", selectedBoardId);

    const remainingBoards = boards.filter(
      (board) => board.id !== selectedBoardId
    );

    setColumns([]);
    setTasks([]);

    setBoards(remainingBoards);
    setSelectedBoardId(remainingBoards[0]?.id || "");
  } catch (error) {
    console.error("Failed to delete board:", error);
  }
};


const handleShareBoard = async () => {
  const token = localStorage.getItem("token");

  if (!token || !selectedBoardId || !shareEmail.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/${selectedBoardId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: shareEmail.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to share board");
    }

    setShareEmail("");
    setShowShareForm(false);
  } catch (error) {
    console.error("Failed to share board:", error);
  }
};

const handleUpdateBoard = async () => {
  const token = localStorage.getItem("token");

  if (!token || !editingBoardId || !editingBoardName.trim()) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/${editingBoardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingBoardName.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update board");
    }

setBoards((currentBoards) =>
  currentBoards.map((board) =>
    board.id === editingBoardId ? data : board
  )
);

    setEditingBoardId(null);
    setEditingBoardName("");
  } catch (error) {
    console.error("Failed to update board:", error);
  }
};


  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/boards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        setBoards(data);
        if (data.length > 0) {
  setSelectedBoardId(data[0].id);
}
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
  const fetchColumns = async () => {
    const token = localStorage.getItem("token");

    if (!token || !selectedBoardId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/columns/${selectedBoardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      if (!response.ok) return;

      const data = await response.json();

      setColumns(data.columns);
    } catch (error) {
      console.error("Failed to fetch columns:", error);
    }
  };

  fetchColumns();
}, [selectedBoardId]);

useEffect(() => {
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token || columns.length === 0) return;

    try {
      const responses = await Promise.all(
        columns.map((column) =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks/${column.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      const taskLists = await Promise.all(
        responses.map((response) => response.json())
      );

      const allTasks = taskLists.flatMap((data) => data.tasks);

      setTasks(allTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  fetchTasks();
}, [columns]);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700">
              <span className="text-sm font-bold text-white">K</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Kanban Board
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBoardForm(true)}
              className="group rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Board
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 hover:border-red-300 active:scale-[0.98]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Board Select */}
            <div className="relative">
              <select
                value={selectedBoardId}
                onChange={(event) => setSelectedBoardId(event.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 outline-none transition-all duration-200 focus:border-slate-400 focus:shadow-lg focus:shadow-slate-200/50 hover:border-slate-300 cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25rem 1.25rem',
                }}
              >
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setEditingBoardId(selectedBoardId);
                setEditingBoardName(
                  boards.find((board) => board.id === selectedBoardId)?.name || ""
                );
              }}
              disabled={!selectedBoardId}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              Edit Board
            </button>

            {editingBoardId === selectedBoardId && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingBoardName}
                  onChange={(event) => setEditingBoardName(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-400 focus:shadow-lg focus:shadow-slate-200/50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleUpdateBoard}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBoardId(null);
                    setEditingBoardName("");
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleDeleteBoard}
              disabled={!selectedBoardId}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              Delete Board
            </button>

            <button
              type="button"
              onClick={() => setShowShareForm(true)}
              disabled={!selectedBoardId}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              Share Board
            </button>

            {showShareForm && (
              <div className="mt-3 flex w-full flex-wrap items-center gap-2 sm:mt-0 sm:w-auto">
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(event) => setShareEmail(event.target.value)}
                  placeholder="Enter user email..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:shadow-lg focus:shadow-slate-200/50 sm:min-w-[200px]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleShareBoard}
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowShareForm(false);
                    setShareEmail("");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <p className="mt-2 ml-1 text-sm font-medium text-slate-500">
            Organize your tasks and workflow efficiently.
          </p>
        </div>

        {showBoardForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Create New Board
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={boardName}
                  onChange={(event) => setBoardName(event.target.value)}
                  placeholder="Enter board name..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:shadow-lg focus:shadow-slate-200/50 hover:border-slate-300"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && boardName.trim()) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  disabled={!boardName.trim()}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/30 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Create
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowBoardForm(false);
                    setBoardName("");
                  }}
                  className="rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Workflow
          </h2>

          <button
            type="button"
            onClick={() => setShowColumnForm(true)}
            className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Add Column
          </button>
        </div>   

        {showColumnForm && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/80 p-5 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">
                Add New Column
              </h4>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={columnName}
                  onChange={(event) => setColumnName(event.target.value)}
                  placeholder="Enter column name..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:shadow-lg focus:shadow-slate-200/50 hover:border-slate-300"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && columnName.trim()) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateColumn}
                  disabled={!columnName.trim()}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/30 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Create
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowColumnForm(false);
                    setColumnName("");
                  }}
                  className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    
        {showTaskForm && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/80 p-5 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">
                Add New Task
              </h4>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                  placeholder="Enter task title..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:shadow-lg focus:shadow-slate-200/50 hover:border-slate-300"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && taskTitle.trim()) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateTask}
                  disabled={!taskTitle.trim()}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/30 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Create
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTaskForm(false);
                    setTaskTitle("");
                    setTaskColumnId("");
                  }}
                  className="rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.id}
              className="rounded-2xl bg-slate-200/70 p-5 shadow-inner"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                {editingColumnId === column.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={editingColumnName}
                      onChange={(event) => setEditingColumnName(event.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none transition-all duration-200 focus:border-slate-400 focus:shadow-lg focus:shadow-slate-200/50"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleUpdateColumn}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-slate-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingColumnId(null);
                        setEditingColumnName("");
                      }}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    {column.name}
                  </h3>
                )}

                <div className="flex items-center gap-2">
                  {editingColumnId !== column.id && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingColumnId(column.id);
                          setEditingColumnName(column.name);
                        }}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-700 hover:bg-slate-100"
                      >
                        Edit
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleDeleteColumn(column.id)}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-slate-500">
                    {tasks.filter((task) => task.columnId === column.id).length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((task) => task.columnId === column.id)
                  .sort((a, b) => a.position - b.position)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/50 transition-all duration-200 hover:shadow-md hover:ring-slate-300"
                    >
                      {editingTaskId === task.id ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            value={editingTaskTitle}
                            onChange={(event) => setEditingTaskTitle(event.target.value)}
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-400 focus:shadow-lg focus:shadow-slate-200/50"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleUpdateTask}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-slate-800"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTaskId(null);
                              setEditingTaskTitle("");
                            }}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-sm font-semibold text-slate-900">
                            {task.title}
                          </h4>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTaskId(task.id);
                                setEditingTaskTitle(task.title);
                              }}
                              className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 hover:bg-slate-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                              className="rounded-lg px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}

                      {task.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {task.description}
                        </p>
                      )}
                    </div>
                  ))}

                {tasks.filter((task) => task.columnId === column.id).length === 0 && (
                  <div className="flex h-30 items-center justify-center rounded-xl border-2 border-dashed border-slate-300/60 bg-white/30 p-8">
                    <p className="text-sm font-medium text-slate-400">
                      No tasks yet
                    </p>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => {
                    setTaskColumnId(column.id);
                    setShowTaskForm(true);
                  }}
                  className="mt-4 w-full rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-500 transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm"
                >
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
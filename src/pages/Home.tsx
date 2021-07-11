import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasDuplicated = tasks.some(task => task.title === newTaskTitle)

    if (hasDuplicated) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevState => [...prevState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevState => {
      const copy = [...prevState]
      
      const updatedState = copy.map(task => {
        if (task.id === id) {
          task.done = !task.done
        }
        return task
      })

      return updatedState
    })
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(prevState => {
              const copy = [...prevState]
        
              const updatedState = copy.filter(task => task.id !== id)
              return updatedState
            })
          }
        }
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: { taskId: number; taskNewTitle : string; }) {
    setTasks(prevState => {
      const copy = [...prevState]
      
      const updatedState = copy.map(task => {
        if (task.id === taskId) {
          task.title = taskNewTitle
        }
        return task
      })

      return updatedState
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
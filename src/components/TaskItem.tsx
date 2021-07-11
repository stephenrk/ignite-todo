import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { Task } from './TasksList'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'

type Props = {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskEdited: { taskId: number; taskNewTitle: string; }) => void;
}

export function TaskItem({ task, index, removeTask, toggleTaskDone, editTask }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setTitle(task.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask({ taskId: task.id, taskNewTitle: title})
        setIsEditing(false)
    }

    return (
        <>
            <View>
                <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
                >
                <View 
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    { task.done && (
                    <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                    )}
                </View>

                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 24 }}>
                {isEditing ? (
                    <TouchableOpacity onPress={handleCancelEditing}>
                        <Icon name="x" size={24} color="#B2B2B2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleStartEditing}>
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View style={{ height: 24, width: 1, backgroundColor: '#C4C4C4', marginHorizontal: 12 }} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})

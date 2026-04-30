import {
    //SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    Keyboard,


} from "react-native";

import styles from "../styles/HomeStyles";
import { useMemo, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = '@tot-list:tasks';

type Task = {
    id: string;
    title: string;
    done: boolean;
}


export default function HomeScreen() {


    const [taskText, setTaskText] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([]);


    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveTasks(tasks);
        }
    }, [tasks, isLoaded]);

    async function loadTasks() {
        try {
            const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as tarefas');
        } finally {
            setIsLoaded(true);
        }
    }

    async function saveTasks(tasksToSave: Task[]) {
        try {
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave));
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar as tarefas');
        }
    }




    const contagemPendentes = useMemo(
        () => tasks.filter((task) => !task.done).length,
        [tasks]
    );
    const contagemCompleta = tasks.length - contagemPendentes;

    function addTask() {
        const trimmedTask = taskText.trim();

        if (!trimmedTask) {
            Alert.alert('Erro', 'Digite uma tarefa');
            return;
        }

        const newTask: Task = {
            id: String(Date.now()),
            title: trimmedTask,
            done: false,
        };

        setTasks((currentTasks) => [newTask, ...currentTasks]);
        setTaskText('');
        Keyboard.dismiss();
    }

    function renderItem({ item }: { item: Task }) {
        return (
            <View style={styles.taskCard}>
                <TouchableOpacity style={styles.taskContent} onPress={() => toggleTask(item.id)}>
                    <View style={[styles.checkCircle, item.done && styles.checkCircleDone]}>
                        {item.done && <Text style={styles.checkCircleIcon}>✓</Text>}
                    </View>
                    <Text style={[styles.taskText, item.done && styles.taskTextDone]}>{item.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function toggleTask(id: string) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id == id ? { ...task, done: !task.done } : task));
    }

    function deleteTask(id: string) {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.title}>Minha Lista de Luiz</Text>
                <Text style={styles.subtitle}>Organizador de Tarefas do LUIZ</Text>
            </View>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicionar tarefa"
                    placeholderTextColor="#000"
                    value={taskText}
                    onChangeText={setTaskText}
                    onSubmitEditing={addTask}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total</Text>
                    <Text style={styles.summaryNumber}>{tasks.length}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Pendentes</Text>
                    <Text style={styles.summaryNumber}>{tasks.filter((task) => !task.done).length}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Feitas</Text>
                    <Text style={styles.summaryNumber}>{tasks.filter((task) => task.done).length}</Text>
                </View>
            </View>

            <FlatList
                data={tasks}
                renderItem={({ item }) => (renderItem({ item }))}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                style={styles.list}

                //a ideia é ter um botao que vai levar para uma pagina separada que vai ter as tarefas na lixeira
                ListHeaderComponent={
                    <View>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderTitle}>Tarefas</Text>
                        </View>
                    </View>
                }

                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhuma tarefa encontrada!</Text>
                        <Text style={styles.emptyText}>Adicione uma tarefa para começar</Text>
                    </View>
                }

            />
        </View>

    );
}

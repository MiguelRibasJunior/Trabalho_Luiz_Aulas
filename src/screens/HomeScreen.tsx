import { 
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import styles from '../styles/HomeStyles';
import { useState } from 'react';
import { FlatList } from 'react-native';

type Task ={
    id: string;
    title: string;
    done: boolean;
};

export default function HomeScreen(){

    const [taskText, setTaskText] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    function addTask(){
        const trimmedTask = taskText.trim();


        if(!trimmedTask){
            Alert.alert('Atenção', 'Digite uma tarefa antes de adicionar !!!');
            return;
        }
    }

    return (
        //<SafeAreaView style={styles.container}>
        <View>
            <StatusBar barStyle='dark-content' backgroundColor='#f5f7fb' />

            <View style={styles.header}>
                <Text style={styles.title}>Home</Text>
                <Text style={styles.subtitle}>Organizador de tarefas.</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Digite uma nova tarefa"
                placeholderTextColor="#000"
                />
                <TouchableOpacity 
                style={styles.addButton}
                activeOpacity={0.8}
                onPress={addTask}
                >
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total : </Text>
                    <Text style={styles.summaryNumber}>0.1</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Pendentes: </Text>
                    <Text style={styles.summaryNumber}>1</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Concluidas: </Text>
                    <Text style={styles.summaryNumber}>0</Text>
                </View>
                
                
            </View>
            <FlatList
            data= {[]}
            keyExtractor={item => item}
            renderItem={(item) => <Text> teste</Text>}
            ListEmptyComponent={
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Nenhuma Tarefa cadastrada</Text>
                    <Text style={styles.emptyText}>Adicione sua primeira tarefa!!!</Text>
                </View>
            }
            />
        </View>
        //</SafeAreaView>
    );
}
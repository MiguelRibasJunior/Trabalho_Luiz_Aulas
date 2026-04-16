import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aec9ff'
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        marginTop: 5,
        fontSize: 16,
        color: "#000",
    },
    inputContainer:{
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    input: {
        flex: 1,
        backgroundColor:"#fff",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#dbe2ea',
    },
    addButton: {
        backgroundColor: '#2563eb',
        borderRadius: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "bold",
    },
    summaryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 10,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    summaryNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    summaryLabel: {
        marginTop: 4,
        fontSize: 13,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#374151',
    },
    emptyText: {
        marginTop: 8,
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
    }


});
export default styles;
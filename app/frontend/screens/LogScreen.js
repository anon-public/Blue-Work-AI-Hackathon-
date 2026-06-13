
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function LogScreen({ route, lastResult }) {
    const agentlog = route.params?.agentLog ?? lastResult?.agentlog;

    if (!agentlog) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#3d7e96', fontSize: 16, textAlign: 'center', fontStyle: 'normal' }}>
                    No history available
                    Search the best 'Ustads' Now
                </Text>
            </View>
        );
    }
    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && styles.alternateRow]}>
            <Text style={styles.index}>{index + 1}</Text>
            <Text style={styles.logText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Ustads Trace</Text>
                <Text style={styles.subtitle}>{agentlog.length} total steps completed</Text>
            </View>
            <FlatList
                data={agentlog}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 24,
        backgroundColor: '#f9fafb',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    listContent: {
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f3f4f6',
        alignItems: 'flex-start',
    },
    alternateRow: {
        backgroundColor: '#fcfcfc',
    },
    index: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#9ca3af',
        width: 30,
        paddingTop: 2,
    },
    logText: {
        flex: 1,
        fontFamily: 'monospace',
        fontSize: 13,
        color: '#374151',
        lineHeight: 18,
    }
});

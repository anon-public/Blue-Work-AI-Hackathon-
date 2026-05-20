import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    LayoutAnimation,
} from 'react-native';
import ProviderCard from '../components/ProviderCard';

export default function ResultsScreen({ route, navigation, lastResult }) {
    const apiResponse = route.params?.apiResponse ?? lastResult;

    const [rejectedIds, setRejectedIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    if (!apiResponse) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#3d7e96', fontSize: 16, textAlign: 'center', fontStyle: 'normal' }}>
                    Waiting for your first request
                </Text>
            </View>
        );
    }
    const { intent, provider: topProvider, allProviders, reminder, agentlog } = apiResponse;


    const availableProviders = allProviders.filter(p => !rejectedIds.includes(p.id));
    const currentProvider = availableProviders[currentIndex] || null;

    const handleConfirm = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/booking/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider: currentProvider, intent }),
            });
            const data = await res.json();
            if (!res.ok) {
                Alert.alert('Booking Failed', data.error || 'Server error');
                return;
            }
            setConfirmed(true);
            setBookingData(data.booking);

            // ✅ Navigate to Log after confirm with the booking log
            navigation.navigate('Log', { agentLog: data.agentlog || agentlog });
        } catch (err) {
            Alert.alert('Error', 'Could not confirm booking. Is the server running?');
        }
    };
    const handleReject = async () => {
        if (!currentProvider) return;
        try {
            await fetch(`${API_BASE_URL}/api/booking/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider: currentProvider, intent }),
            });
            setRejectedIds(prev => [...prev, currentProvider.id]);
            setCurrentIndex(0);
        } catch (err) {
            Alert.alert('Error', 'Could not reject. Is the server running?');
        }
    };
    const handleFindMore = () => {
        if (currentIndex + 1 < availableProviders.length) {
            setCurrentIndex(prev => prev + 1);
        } else {
            Alert.alert('No more providers', 'All available providers have been shown.');
        }
    };
    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Your Match</Text>
            <Text style={styles.sectionSubtitle}>We found a provider available for your request.</Text>

            {/* Intent Summary */}
            <View style={styles.summaryCard}>
                <Text style={styles.cardLabel}>REQUEST SUMMARY</Text>
                <View style={styles.badgeContainer}>
                    <View style={styles.badge}><Text style={styles.badgeText}>{intent.service}</Text></View>
                    <View style={styles.badge}><Text style={styles.badgeText}>{intent.location}</Text></View>
                    <View style={styles.badge}><Text style={styles.badgeText}>{intent.time}</Text></View>
                </View>
            </View>
            {/* Provider Match Section */}
            {!confirmed ? (
                <>
                    {currentProvider ? (
                        <>
                            <ProviderCard
                                name={currentProvider.name}
                                rating={currentProvider.rating}
                                distance_km={currentProvider.distance_km}
                                category={currentProvider.category}
                                priceEstimate={currentProvider.priceEstimate}
                                isTopRanked={true}
                            />

                            {/* Three Action Buttons */}
                            <View style={styles.actionRow}>

                                {/* Reject - Red X */}
                                <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
                                    <Text style={styles.actionIcon}>✕</Text>
                                </TouchableOpacity>

                                {/* Find More - Blue Refresh */}
                                <TouchableOpacity style={styles.refreshBtn} onPress={handleFindMore}>
                                    <Text style={styles.actionIcon}>↺</Text>
                                </TouchableOpacity>

                                {/* Confirm - Green Tick */}
                                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                                    <Text style={styles.actionIcon}>✓</Text>
                                </TouchableOpacity>

                            </View>

                            <Text style={styles.hintText}>
                                {availableProviders.length - 1} other provider(s) available
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.noProviderText}>No more providers available.</Text>
                    )}
                </>
            ) : (
                /* Show booking only after confirm */
                <>
                    <ProviderCard
                        name={currentProvider.name}
                        rating={currentProvider.rating}
                        distance_km={currentProvider.distance_km}
                        category={currentProvider.category}
                        priceEstimate={currentProvider.priceEstimate}
                        isTopRanked={true}
                    />
                    {bookingData ? (
                        <View style={styles.bookingBox}>
                            <View style={styles.bookingHeader}>
                                <Text style={styles.bookingTitle}>Status</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>● {bookingData.status}</Text>
                                </View>
                            </View>
                            <View style={styles.bookingRow}>
                                <Text style={styles.bookingLabel}>Arrival Window</Text>
                                <Text style={styles.bookingValue}>{bookingData.slot}</Text>
                            </View>
                            <View style={styles.bookingRow}>
                                <Text style={styles.bookingLabel}>Confirmation ID</Text>
                                <Text style={styles.bookingValue}>{bookingData.confirmationId}</Text>
                            </View>
                        </View>
                    ) : null}

                    {reminder && (
                        <View style={styles.reminderRow}>
                            <Text style={styles.reminderText}>
                                {reminder.message} set for {reminder.triggerAt}
                            </Text>
                        </View>
                    )}
                </>
            )}



            {/* Collapsible Reasoning */}
            <TouchableOpacity style={styles.reasoningHeader} onPress={toggleExpand} activeOpacity={0.7}>
                <Text style={styles.reasoningTitle}>Why this provider?</Text>
                <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.reasoningContent}>
                    <Text style={styles.reasoningText}>{topProvider.reasoning}</Text>
                </View>
            )}

            {/* Action Button */}
            <TouchableOpacity
                style={styles.logButton}
                onPress={() => navigation.navigate('Log', { agentLog: agentlog })}
            >
                <Text style={styles.logButtonText}>View Agent Log</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    content: {
        padding: 22,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 24,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#89c5fd',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4b5563',
        letterSpacing: 1,
        marginBottom: 12,
    },
    badgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    badge: {
        backgroundColor: '#e0e7ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    badgeText: {
        color: '#4338ca',
        fontSize: 14,
        fontWeight: '600',
    },
    bookingBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    statusBadge: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#166534',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    bookingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    bookingLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    bookingValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    reminderRow: {
        marginBottom: 24,
    },
    reminderText: {
        fontSize: 14,
        color: '#6b7280',
        fontStyle: 'italic',
    },
    reasoningHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#89c5fd',
    },
    reasoningTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#62c1e5',
    },
    expandIcon: {
        fontSize: 12,
        color: '#62c1e5',
    },
    reasoningContent: {
        paddingBottom: 16,
    },
    reasoningText: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
    },
    logButton: {
        backgroundColor: '#62c1e5',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 40,
    },
    logButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginVertical: 24,
    },
    rejectBtn: {
        width: 85, height: 64, borderRadius: 12,
        backgroundColor: '#ef4444',
        justifyContent: 'center', alignItems: 'center',
    },
    refreshBtn: {
        width: 85, height: 64, borderRadius: 12,
        backgroundColor: '#62c1e5',
        justifyContent: 'center', alignItems: 'center',
    },
    confirmBtn: {
        width: 85, height: 64, borderRadius: 12,
        backgroundColor: '#16a34a',
        justifyContent: 'center', alignItems: 'center',
    },
    actionIcon: {
        fontSize: 28, color: '#fff', fontWeight: 'bold',
    },
    hintText: {
        textAlign: 'center', color: '#6b7280', fontSize: 13, marginTop: 4,
    },
    noProviderText: {
        textAlign: 'center', color: '#ef4444', fontSize: 16, marginTop: 40,
    },
});
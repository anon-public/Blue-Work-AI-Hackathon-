
import React from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
const COLORS = {
    bg: '#F7F9F7',
    card: '#FFFFFF',
    green: '#3D9B5F',
    greenLight: '#E8F5ED',
    greenMid: '#A8D5B5',
    dark: '#1A1A1A',
    muted: '#8A8A8A',
    red: '#E05252',
    border: '#EFEFEF',
    blueMid: "#3da9d8",
    blueLight: '#b7e6f5',
    blue: "#3da9d8"
};
const WORKER = {
    balance: 17298.92,
    cards: [{ last4: '7391' }, { last4: '7394' }],
    activity: [
        { name: 'Ali', sub: 'Today, 16:33', amount: +120, type: 'Cash', color: '#EA4C89', initial: 'A' },
        { name: 'Khan', sub: 'Yesterday', amount: +240, type: 'Online', color: '#3B82F6', initial: 'K' },
        { name: 'Ali Khan', sub: 'Yesterday', amount: +450, type: 'Cash', color: '#F59E0B', initial: 'AK' },
        { name: 'Raza', sub: '2 days ago', amount: +280, type: 'Cash', color: '#8B5CF6', initial: 'R' },
    ],
    earning: 7221.18,
    spendingChange: 4.3,
    weekly: [40, 65, 45, 90, 55, 70, 50],
    monthly: [30, 45, 35, 60, 85, 72, 90],
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

const fmt = (n) => Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

export default function WorkerDashboard({ route }) {

    const { name, age, category, area, avb_dist } = route.params;
    const activeDay = 4;
    return (
        <SafeAreaView style={styles.screen}
        >
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View >
                    <Text style={styles.greet}>Hi, {name} </Text>
                    <Text style={styles.subtitle}>Wellcome Back</Text>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.btext}>Total Earned</Text>

                    <Text style={styles.btext}>
                        Rs. 25400.00
                    </Text>
                </View>

                <View style={styles.actionsRow}>

                    <Pressable style={styles.actionCard}>
                        <Text>102</Text>
                        <Text style={styles.subtitle}>Projects Completed</Text>
                    </Pressable>

                    <Pressable style={styles.actionCard}>
                        <Text>4.7</Text>
                        <Text style={styles.subtitle}>Rating Achieved</Text>
                    </Pressable>

                    <Pressable style={styles.actionCard}>
                        <Text>6</Text>
                        <Text style={styles.subtitle}>Projects Pending</Text>
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                    </View>
                    {WORKER.activity.map((item, i) => (
                        <View key={i} style={styles.activityRow}>
                            <View style={[styles.avatar, { backgroundColor: item.color + '22' }]}>
                                <Text style={{ color: item.color, fontWeight: '700', fontSize: 12 }}>{item.initial}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activityName}>{item.name}</Text>
                                <Text style={styles.activitySub}>{item.sub}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={[styles.activityAmount, { color: item.amount < 0 ? COLORS.red : COLORS.green }]}>
                                    {item.amount < 0 ? '-' : '+'}Rs.{fmt(item.amount)}
                                </Text>
                                <Text style={styles.activityType}>{item.type}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.divider} />


                <View style={styles.section}>
                    <Text style={styles.analyticsTitle}>Analytics</Text>

                    {/* Spending Summary */}
                    <View style={styles.spendingCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.spendingLabel}>My Earnings (weekly)</Text>
                            <Text style={styles.spendingAmount}>Rs.{fmt(WORKER.earning)}</Text>
                            <Text style={styles.spendingChange}>
                                ▲ {WORKER.spendingChange}% From last week
                            </Text>
                        </View>

                        {/* Weekly Bar Chart */}
                        <View style={styles.barChart}>
                            {WORKER.weekly.map((v, i) => (
                                <View key={i} style={styles.barCol}>
                                    <View style={[styles.bar, {
                                        height: (v / 100) * 52,
                                        backgroundColor: i === activeDay ? COLORS.blueMid : COLORS.blueLight,
                                        opacity: i === activeDay ? 1 : 0.5,
                                    }]} />
                                    <Text style={[styles.barLabel, { color: i === activeDay ? COLORS.blue : COLORS.muted }]}>
                                        {WORKER.days[i]}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.analyticsTitle}>My Profile </Text>
                    <View style={styles.pcard}>
                        <Text style={styles.plabel}>Age: <Text style={styles.ptext}>{age}</Text> </Text>
                        <Text style={styles.plabel}>Category: <Text style={styles.ptext}>{category}</Text></Text>
                        <Text style={styles.plabel}>Area: <Text style={styles.ptext}>{area}</Text></Text>
                        <Text style={styles.plabel}>Availability Distance: <Text style={styles.ptext}>{avb_dist}</Text></Text>
                    </View>


                </View>


            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create(
    {
        "screen": {
            flex: 1,
            paddingTop: 12,
            margin: 6
        },
        "container": {
            padding: 12
        },
        greet: {
            fontSize: 18,
            fontWeight: 600
        },
        subtitle: {
            fontSize: 14,
            color: "#3d3d3d",
            fontWeight: 600,
            textAlign: "left",
            padding: 2
        },
        balanceCard: {
            backgroundColor: "#62c2e5",
            borderRadius: 12,
            padding: 20,
            marginTop: 20,

        },
        btext: {
            color: "#000000",
            fontSize: 20,
            fontWeight: 700,
        },
        actionsRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
        },
        actionCard: {
            width: "30%",
            height: 80,
            backgroundColor: "#62c2e5cb",
            borderRadius: 15,
            borderColor: "#3d7e96",
            justifyContent: "center",
            alignItems: "center",
        },
        section: { paddingHorizontal: 20, marginTop: 24 },
        sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
        sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.dark },
        activityRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
        avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
        activityName: { fontSize: 14, fontWeight: '600', color: COLORS.dark },
        activitySub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
        activityAmount: { fontSize: 14, fontWeight: '700' },
        activityType: { fontSize: 11, color: COLORS.muted, marginTop: 2 },

        divider: { height: 8, backgroundColor: COLORS.border, marginTop: 24 },
        analyticsTitle: { fontSize: 22, fontWeight: '800', color: COLORS.dark, marginBottom: 16 },
        spendingCard: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
        spendingLabel: { fontSize: 12, color: COLORS.muted },
        spendingAmount: { fontSize: 22, fontWeight: '800', color: COLORS.dark, marginTop: 4 },
        spendingChange: { fontSize: 11, color: COLORS.green, marginTop: 4 },

        barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 70, paddingBottom: 16 },
        barCol: { alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
        bar: { width: 10, borderRadius: 4 },
        barLabel: { fontSize: 9, fontWeight: '600' },

        pcard: { backgroundColor: COLORS.card, borderRadius: 12, borderColor: "#000", padding: 10 },
        plabel: { fontSize: 14, fontWeight: 500, padding: 3 },
        ptext: { fontSize: 12, fontWeight: 400 }
    }
);




